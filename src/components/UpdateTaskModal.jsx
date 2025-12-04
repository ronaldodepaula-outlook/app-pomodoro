import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import { listTags, updateTask } from '../services/task.service'

export default function UpdateTaskModal({ open, task, onClose, onSuccess }) {
  const [status, setStatus] = useState('pending')
  const [selectedTags, setSelectedTags] = useState([])
  const [allTags, setAllTags] = useState([])
  const [loadingTags, setLoadingTags] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  // Status mapping: backend values -> Portuguese labels
  const statusMap = {
    pending: 'Pendente',
    in_progress: 'Em Progresso',
    completed: 'Concluído'
  }

  useEffect(() => {
    if (open && task) {
      // Inicializar status e tags da tarefa atual
      setStatus(task.status || 'pending')
      setSelectedTags(task.tags?.map(t => t.id) || [])
      setError(null)
      loadTags()
    }
  }, [open, task])

  async function loadTags() {
    setLoadingTags(true)
    try {
      const res = await listTags()
      const tags = res.data.data || res.data || []
      setAllTags(Array.isArray(tags) ? tags : [])
    } catch (err) {
      console.error('Erro ao carregar tags:', err)
      setError('Erro ao carregar tags')
    } finally {
      setLoadingTags(false)
    }
  }

  function handleTagChange(tagId) {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  async function handleConfirm() {
    if (!task) return
    setUpdating(true)
    setError(null)
    try {
      const payload = {
        titulo: task.titulo,
        status: status,
        tags: selectedTags
      }
      await updateTask(task.id, payload)
      onSuccess()
      onClose()
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err)
      setError(err.response?.data?.message || 'Erro ao atualizar tarefa')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Atualizar Tarefa</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          {/* Status Selector */}
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              disabled={updating}
            >
              {Object.entries(statusMap).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tags Multi-Select */}
          <FormControl fullWidth>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Tags (opcional)
            </Typography>
            {loadingTags ? (
              <CircularProgress size={24} />
            ) : (
              <FormGroup>
                {allTags.map(tag => (
                  <FormControlLabel
                    key={tag.id}
                    control={
                      <Checkbox
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagChange(tag.id)}
                        disabled={updating}
                      />
                    }
                    label={tag.nome}
                  />
                ))}
              </FormGroup>
            )}
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={updating}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          disabled={updating}
        >
          {updating ? 'Atualizando...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
