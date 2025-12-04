import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Card, CardContent, TextField, Select, MenuItem, FormControl, FormLabel, Button, Stack, Typography, Alert, Container, Box, CircularProgress } from '@mui/material'
import { Settings as SettingsIcon, Save } from '@mui/icons-material'

export default function Settings() {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/config')
        setConfig(res.data)
      } catch (err) {
        console.error('Erro ao carregar configurações:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      await api.put('/config', config)
      setMessage({ type: 'success', text: '✅ Configurações salvas com sucesso!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro ao salvar configurações' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />

  return (
    <Container maxWidth="sm">
      <Stack spacing={3} sx={{ py: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <SettingsIcon sx={{ fontSize: 32, color: '#1976d2' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            ⚙️ Configurações
          </Typography>
        </Stack>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Card sx={{ boxShadow: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box>
                <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                  ⏱️ Tempo de Foco (segundos)
                </FormLabel>
                <TextField
                  type="number"
                  fullWidth
                  value={config?.tempo_foco_seg || 1500}
                  onChange={e => setConfig({ ...config, tempo_foco_seg: Number(e.target.value) })}
                  variant="outlined"
                  size="small"
                  helperText="Duração padrão de cada sessão Pomodoro"
                />
              </Box>

              <Box>
                <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                  🎨 Tema
                </FormLabel>
                <FormControl fullWidth size="small">
                  <Select
                    value={config?.tema || 'light'}
                    onChange={e => setConfig({ ...config, tema: e.target.value })}
                  >
                    <MenuItem value="light">☀️ Light (Claro)</MenuItem>
                    <MenuItem value="dark">🌙 Dark (Escuro)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={saving}
                fullWidth
                sx={{ py: 1.5, fontWeight: 700 }}
              >
                {saving ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 1, backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0' }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
              💡 Dica: As configurações são aplicadas globalmente em sua conta.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}
