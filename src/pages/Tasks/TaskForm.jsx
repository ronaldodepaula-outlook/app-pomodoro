import React, { useEffect, useState } from 'react'
import { createTask, getTask, updateTask } from '../../services/task.service'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Card, CardContent, TextField, Button, Stack, Typography, Container, Box, 
  Select, MenuItem, FormControl, FormLabel, Alert, CircularProgress,
  Paper
} from '@mui/material'
import { Save, ArrowBack, Edit, AddCircle } from '@mui/icons-material'

export default function TaskForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ titulo: '', descricao: '', prioridade: 'medium', pomodoros_estimados: 1 })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (id) {
      setFetching(true);
      (async () => {
        try {
          const res = await getTask(id)
          setForm(res.data)
        } catch (err) {
          setError('Erro ao carregar tarefa')
          console.error(err)
        } finally {
          setFetching(false)
        }
      })()
    }
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)
    try {
      if (id) await updateTask(id, form)
      else await createTask(form)
      setSuccess(true)
      setTimeout(() => navigate('/tasks'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar tarefa')
      console.error(err)
    } finally { 
      setLoading(false) 
    }
  }

  if (fetching) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {id ? <Edit sx={{ fontSize: 32, color: '#1976d2' }} /> : <AddCircle sx={{ fontSize: 32, color: '#1976d2' }} />}
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {id ? '✏️ Editar Tarefa' : '➕ Nova Tarefa'}
            </Typography>
          </Stack>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/tasks')}
            sx={{ textTransform: 'none' }}
          >
            Voltar
          </Button>
        </Box>

        {/* Success Message */}
        {success && (
          <Alert severity="success" sx={{ animation: 'fadeIn 0.3s' }}>
            ✅ Tarefa salva com sucesso! Redirecionando...
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Form Card */}
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Título */}
                <Box>
                  <FormLabel sx={{ display: 'block', mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
                    📝 Título da Tarefa *
                  </FormLabel>
                  <TextField
                    fullWidth
                    placeholder="Ex: Implementar API de usuários"
                    value={form.titulo}
                    onChange={e => setForm({ ...form, titulo: e.target.value })}
                    required
                    variant="outlined"
                    size="medium"
                  />
                </Box>

                {/* Descrição */}
                <Box>
                  <FormLabel sx={{ display: 'block', mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
                    📋 Descrição
                  </FormLabel>
                  <TextField
                    fullWidth
                    placeholder="Descreva os detalhes da tarefa..."
                    value={form.descricao}
                    onChange={e => setForm({ ...form, descricao: e.target.value })}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Box>

                {/* Prioridade e Pomodoros */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {/* Prioridade */}
                  <Box>
                    <FormLabel sx={{ display: 'block', mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
                      🎯 Prioridade
                    </FormLabel>
                    <FormControl fullWidth size="small">
                      <Select
                        value={form.prioridade}
                        onChange={e => setForm({ ...form, prioridade: e.target.value })}
                      >
                        <MenuItem value="low">🟢 Baixa</MenuItem>
                        <MenuItem value="medium">🟡 Média</MenuItem>
                        <MenuItem value="high">🔴 Alta</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Pomodoros Estimados */}
                  <Box>
                    <FormLabel sx={{ display: 'block', mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
                      ⏱️ Pomodoros Estimados
                    </FormLabel>
                    <TextField
                      fullWidth
                      type="number"
                      value={form.pomodoros_estimados}
                      onChange={e => setForm({ ...form, pomodoros_estimados: Math.max(1, Number(e.target.value)) })}
                      inputProps={{ min: 1, step: 1 }}
                      size="small"
                    />
                  </Box>
                </Box>

                {/* Info Box */}
                <Paper sx={{ backgroundColor: '#f5f5f5', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    💡 <strong>Dica:</strong> Estime quantos pomodoros (sessões de 25 min) essa tarefa levará para ser concluída.
                  </Typography>
                </Paper>

                {/* Buttons */}
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<Save />}
                    disabled={loading || !form.titulo.trim()}
                    sx={{ fontWeight: 700, py: 1.5 }}
                  >
                    {loading ? 'Salvando...' : id ? 'Atualizar Tarefa' : 'Criar Tarefa'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/tasks')}
                    disabled={loading}
                    sx={{ fontWeight: 700, py: 1.5 }}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 1, border: '1px solid #90caf9' }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: '#1565c0' }}>
              📌 <strong>Como usar:</strong> Preencha o título (obrigatório), descreva a tarefa, defina a prioridade e estime quantos pomodoros serão necessários. Clique em "Criar Tarefa" para salvar.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}
