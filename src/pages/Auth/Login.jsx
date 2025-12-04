import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../services/auth.service'
import useAuthStore from '../../stores/authStore'
import { Card, CardContent, TextField, Button, Stack, Typography, Alert, Container, Box } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

export default function Login() {
  const setAuth = useAuthStore(state => state.setAuth)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await login({ email, password })
      setAuth(res.user, res.token)
      navigate('/timer')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao conectar')
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
              <LockOutlined sx={{ fontSize: 48, color: '#1976d2' }} />
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700, textAlign: 'center' }}>
                🔐 Bem-vindo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Entre com suas credenciais para acessar sua conta
              </Typography>

              {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <TextField
                    label="E-mail"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ py: 1.5, fontWeight: 700 }}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </Stack>
              </Box>

              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Não tem conta?{' '}
                <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 700 }}>
                  Cadastre-se aqui
                </Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
