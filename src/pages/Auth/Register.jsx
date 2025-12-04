import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register, login } from '../../services/auth.service'
import useAuthStore from '../../stores/authStore'
import { Card, CardContent, TextField, Button, Stack, Typography, Alert, Container, Box } from '@mui/material'
import { PersonAdd } from '@mui/icons-material'

export default function Register() {
  const setAuth = useAuthStore(state => state.setAuth)
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(form)
      // opcional: auto-login
      const loginRes = await login({ email: form.email, password: form.password })
      setAuth(loginRes.user, loginRes.token)
      navigate('/timer')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center">
              <PersonAdd sx={{ fontSize: 48, color: '#388e3c' }} />
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700, textAlign: 'center' }}>
                👤 Criar Conta
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Cadastre-se para começar a usar o Pomodoro
              </Typography>

              {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <TextField
                    label="Nome Completo"
                    fullWidth
                    value={form.nome}
                    onChange={e => setForm({ ...form, nome: e.target.value })}
                    required
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="E-mail"
                    type="email"
                    fullWidth
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Confirmar Senha"
                    type="password"
                    fullWidth
                    value={form.password_confirmation}
                    onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
                    required
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    disabled={loading}
                    sx={{ py: 1.5, fontWeight: 700 }}
                  >
                    {loading ? 'Criando conta...' : 'Criar Conta'}
                  </Button>
                </Stack>
              </Box>

              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Já tem conta?{' '}
                <Button
                  component={Box}
                  onClick={() => navigate('/login')}
                  sx={{ color: '#388e3c', textDecoration: 'none', fontWeight: 700, p: 0, fontSize: 'inherit' }}
                >
                  Entre aqui
                </Button>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
