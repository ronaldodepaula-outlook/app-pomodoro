import React, { useEffect, useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  TablePagination,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Divider
} from '@mui/material'
import { Add, Edit, Delete, Visibility, CheckCircle, PlayArrow, HourglassEmpty, Label } from '@mui/icons-material'
import * as tagService from '../../services/tag.service'

export default function TagsManager() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(50)
  const [total, setTotal] = useState(0)

  // Dialog state
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState('create') // create | edit | view
  const [selectedTag, setSelectedTag] = useState(null)
  const [formName, setFormName] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    loadTags(1)
  }, [])

  async function loadTags(pageNumber = 1) {
    setLoading(true)
    setError(null)
    try {
      const res = await tagService.listTags({ page: pageNumber })
      const payload = res.data || {}
      const items = payload.data || []
      setTags(Array.isArray(items) ? items : [])
      setPage((payload.current_page || pageNumber) - 1)
      setPerPage(payload.per_page || perPage)
      setTotal(payload.total || (Array.isArray(items) ? items.length : 0))
    } catch (err) {
      console.error('Erro ao carregar tags', err)
      setError(err.response?.data?.message || 'Erro ao carregar tags')
    } finally {
      setLoading(false)
    }
  }

  function handleOpenCreate() {
    setFormMode('create')
    setSelectedTag(null)
    setFormName('')
    setFormError(null)
    setOpenForm(true)
  }

  async function handleOpenEdit(tag) {
    setFormMode('edit')
    setSelectedTag(tag)
    setFormName(tag.nome || '')
    setFormError(null)
    setOpenForm(true)
  }

  async function handleOpenView(tag) {
    setFormMode('view')
    try {
      setFormLoading(true)
      const res = await tagService.getTag(tag.id)
      // try to parse different shapes
      const data = res.data?.tag || res.data?.data || res.data || {}
      setSelectedTag(data)
      setFormName(data.nome || '')
      setFormError(null)
      setOpenForm(true)
    } catch (err) {
      console.error('Erro ao buscar tag', err)
      setFormError(err.response?.data?.message || 'Erro ao buscar tag')
    } finally {
      setFormLoading(false)
    }
  }

  async function handleDelete(tag) {
    if (!window.confirm(`Remover tag "${tag.nome}"? Esta ação não pode ser desfeita.`)) return
    try {
      await tagService.deleteTag(tag.id)
      // refresh
      loadTags(1)
    } catch (err) {
      console.error('Erro ao deletar tag', err)
      if (err.response?.status === 409) {
        alert(err.response?.data?.message || 'Não é possível remover tag que está associada a tarefas.')
      } else {
        alert('Erro ao remover tag')
      }
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    if (!formName || formName.trim().length === 0) {
      setFormError('Nome obrigatório')
      return
    }
    if (formName.length > 100) {
      setFormError('Máximo 100 caracteres')
      return
    }
    setFormLoading(true)
    setFormError(null)
    try {
      if (formMode === 'create') {
        await tagService.createTag({ nome: formName.trim() })
      } else if (formMode === 'edit' && selectedTag) {
        await tagService.updateTag(selectedTag.id, { nome: formName.trim() })
      }
      setOpenForm(false)
      loadTags(1)
    } catch (err) {
      console.error('Erro no submit', err)
      const msg = err.response?.data?.message || (err.response?.data?.errors ? JSON.stringify(err.response.data.errors) : 'Erro')
      setFormError(msg)
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestão de Tags</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate}>Nova Tag</Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Criado</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tags.map(tag => (
                    <TableRow key={tag.id}>
                      <TableCell>{tag.id}</TableCell>
                      <TableCell>{tag.nome}</TableCell>
                      <TableCell>{tag.created_at ? new Date(tag.created_at).toLocaleString() : '-'}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" title="Ver" onClick={() => handleOpenView(tag)}>
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" title="Editar" onClick={() => handleOpenEdit(tag)}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" title="Remover" onClick={() => handleDelete(tag)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={(e, newPage) => loadTags(newPage + 1)}
              rowsPerPage={perPage}
              rowsPerPageOptions={[10, 25, 50]}
              onRowsPerPageChange={(e) => { loadTags(1); setPerPage(Number(e.target.value)) }}
            />
          </CardContent>
        </Card>
      )}

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {formMode === 'create' && 'Criar Tag'}
          {formMode === 'edit' && 'Editar Tag'}
          {formMode === 'view' && 'Detalhes da Tag'}
        </DialogTitle>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          {formLoading ? (
            <CircularProgress />
          ) : (
            <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
              <TextField
                label="Nome"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                fullWidth
                required
                inputProps={{ maxLength: 100 }}
                disabled={formMode === 'view'}
                sx={{ mb: 2 }}
              />

              {formMode === 'view' && selectedTag && (
                <Box>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Label />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{selectedTag.nome}</Typography>
                      <Typography variant="caption" color="text.secondary">ID: {selectedTag.id} • Criado: {selectedTag.created_at ? new Date(selectedTag.created_at).toLocaleString() : '-'}</Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Chip label={selectedTag.total ?? ''} variant="outlined" />
                    </Box>
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Tarefas associadas</Typography>
                  {Array.isArray(selectedTag.tasks) && selectedTag.tasks.length > 0 ? (
                    <List>
                      {selectedTag.tasks.map((t) => (
                        <ListItem key={t.id} alignItems="flex-start" sx={{ py: 1 }}>
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: '#1976d2' }}>{(t.titulo || '').charAt(0)}</Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={<>
                              <Typography component="span" sx={{ fontWeight: 700 }}>{t.titulo}</Typography>
                              {' '}
                              <Chip
                                label={t.prioridade ? t.prioridade.charAt(0).toUpperCase() + t.prioridade.slice(1) : ''}
                                size="small"
                                sx={{ ml: 1, backgroundColor: t.prioridade === 'high' ? '#d32f2f' : undefined, color: 'white' }}
                              />
                            </>}
                            secondary={
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                  {t.status === 'completed' ? <CheckCircle color="success" fontSize="small" /> : t.status === 'in_progress' ? <PlayArrow color="info" fontSize="small" /> : <HourglassEmpty color="warning" fontSize="small" />}
                                  <Typography variant="caption" color="text.secondary">{t.status}</Typography>
                                </Stack>
                                <Typography variant="caption" color="text.secondary">Pomodoros: {t.pomodoros_concluidos ?? t.pomodoros_estimados ?? '-'}</Typography>
                                <Typography variant="caption" color="text.secondary">Criado: {t.created_at ? new Date(t.created_at).toLocaleString() : '-'}</Typography>
                              </Stack>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Nenhuma tarefa associada.</Typography>
                  )}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Fechar</Button>
          {(formMode === 'create' || formMode === 'edit') && (
            <Button onClick={handleFormSubmit} variant="contained">{formMode === 'create' ? 'Criar' : 'Salvar'}</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}
