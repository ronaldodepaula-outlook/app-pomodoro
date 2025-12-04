import React, { useEffect, useState } from 'react'
import { listTasks, deleteTask } from '../../services/task.service'
import { Link, useNavigate } from 'react-router-dom'
import UpdateTaskModal from '../../components/UpdateTaskModal'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import {
  PlayArrow,
  Edit,
  Delete,
  Add,
  CheckCircle,
  Schedule,
  Description,
  Edit as EditStatus
} from '@mui/icons-material'

export default function TasksList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null })
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedTaskForUpdate, setSelectedTaskForUpdate] = useState(null)
  const navigate = useNavigate()

  async function load() {
    setLoading(true)
    try {
      const res = await listTasks()
      setTasks(res.data.data || res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function handleDeleteClick(id) {
    setDeleteConfirm({ open: true, id })
  }

  function handleDeleteConfirm() {
    if (deleteConfirm.id) {
      performDelete(deleteConfirm.id)
    }
  }

  async function performDelete(id) {
    try {
      await deleteTask(id)
      setDeleteConfirm({ open: false, id: null })
      load()
    } catch (err) {
      console.error(err)
    }
  }

  function handleStartTask(taskId) {
    navigate(`/timer?taskId=${taskId}`)
  }

  function handleUpdateStatusClick(task) {
    setSelectedTaskForUpdate(task)
    setUpdateModalOpen(true)
  }

  function handleUpdateSuccess() {
    // Recarregar a lista após sucesso
    load()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'concluida':
        return 'success'
      case 'pending':
      case 'pendente':
        return 'warning'
      case 'in_progress':
      case 'em_progresso':
        return 'info'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
      case 'concluida':
        return 'Concluída'
      case 'pending':
      case 'pendente':
        return 'Pendente'
      case 'in_progress':
      case 'em_progresso':
        return 'Em Progresso'
      default:
        return status
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta':
        return '#d32f2f'
      case 'media':
        return '#f57c00'
      case 'baixa':
        return '#388e3c'
      default:
        return '#757575'
    }
  }

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Minhas Tarefas
        </Typography>
        <Link to="/tasks/new" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Nova Tarefa
          </Button>
        </Link>
      </Stack>

      {loading ? (
        <Stack alignItems="center" justifyContent="center" minHeight="300px">
          <CircularProgress />
        </Stack>
      ) : tasks.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <Schedule sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Nenhuma tarefa criada
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Crie uma nova tarefa para começar
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {tasks.map(task => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        flex: 1,
                        wordBreak: 'break-word'
                      }}
                    >
                      {task.titulo}
                    </Typography>
                    {task.prioridade && (
                      <Chip
                        label={task.prioridade.charAt(0).toUpperCase() + task.prioridade.slice(1)}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(task.prioridade),
                          color: 'white',
                          fontWeight: 600,
                          ml: 1
                        }}
                      />
                    )}
                  </Stack>

                  {task.descricao && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <Description sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-top' }} />
                      {task.descricao}
                    </Typography>
                  )}

                  {task.status && (
                    <Chip
                      label={getStatusLabel(task.status)}
                      color={getStatusColor(task.status)}
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </CardContent>

                <CardActions sx={{ pt: 1, gap: 1, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<PlayArrow />}
                    onClick={() => handleStartTask(task.id)}
                    sx={{ flex: '1 1 auto', minWidth: '120px' }}
                  >
                    Iniciar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<EditStatus />}
                    onClick={() => handleUpdateStatusClick(task)}
                    title="Atualizar status e tags"
                    sx={{ flex: '1 1 auto', minWidth: '100px' }}
                  >
                    Status
                  </Button>
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/tasks/${task.id}/edit`}
                      title="Editar tarefa"
                      sx={{ p: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(task.id)}
                      title="Deletar tarefa"
                      sx={{ p: 1 }}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
      >
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja remover essa tarefa? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Remover
          </Button>
        </DialogActions>
      </Dialog>

      <UpdateTaskModal
        open={updateModalOpen}
        task={selectedTaskForUpdate}
        onClose={() => {
          setUpdateModalOpen(false)
          setSelectedTaskForUpdate(null)
        }}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  )
}
