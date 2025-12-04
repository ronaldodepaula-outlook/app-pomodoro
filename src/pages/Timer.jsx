import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Stack, ToggleButton, ToggleButtonGroup, CircularProgress, Alert, Box } from '@mui/material';
import { ArrowBack, PlayArrow, Stop, VolumeUp } from '@mui/icons-material';
import useInterval from '../utils/useInterval';
import useSound from '../utils/useSound';
import { startPomodoro, finishPomodoro } from '../services/pomodoro.service';

export default function Timer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { playNotificationSound } = useSound();
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [tipo, setTipo] = useState('focus');
  const [pomodoro, setPomodoro] = useState(null);
  const [taskId, setTaskId] = useState(searchParams.get('taskId') || '');
  const [error, setError] = useState('')
  const [initialSeconds, setInitialSeconds] = useState(25 * 60)
  const [finished, setFinished] = useState(false)

  useInterval(() => {
    if (running) {
      setSeconds(s => {
        if (s <= 1) {
          handleFinish();
          setFinished(true)
          return 0;
        }
        return s - 1;
      });
    }
  }, 1000);

  async function handleStart() {
    try {
      setError('');
      
      const payload = {
        task_id: taskId ? parseInt(taskId) : null,
        tipo,
        device: 'web'
      };

      const res = await startPomodoro(payload);
      setPomodoro(res.data);
      setRunning(true);
      setInitialSeconds(25 * 60);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao iniciar pomodoro');
      console.error('Erro ao iniciar pomodoro:', err);
    }
  }

  async function handleFinish() {
    setRunning(false);
    playNotificationSound(); // Tocar som ao finalizar
    
    if (!pomodoro) return;

    try {
      // Calculate actual duration spent (initial time - remaining time)
      const duracao = initialSeconds - seconds;
      await finishPomodoro(pomodoro.id, { duracao_segundos: duracao, concluido: true });

      setSeconds(25 * 60);
      setPomodoro(null);
      setTaskId('');
      setInitialSeconds(25 * 60);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao finalizar pomodoro');
      console.error('Erro ao finalizar pomodoro:', err);
    }
  }

  return (
    <Stack sx={{ minHeight: 'calc(100vh - 200px)', py: 4, px: 2 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            ⏱️ Pomodoro Timer
          </Typography>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard')}
            sx={{ textTransform: 'none' }}
          >
            Voltar
          </Button>
        </Box>

        {/* Completion Alert */}
        {finished && (
          <Alert 
            severity="success"
            onClose={() => setFinished(false)}
            sx={{ 
              border: '2px solid #4caf50',
              backgroundColor: '#f1f8e9',
              '& .MuiAlert-icon': { color: '#4caf50', fontSize: '2rem' }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              ✅ Pomodoro Finalizado! 🎉
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Excelente trabalho! Você completou uma sessão de {tipo === 'focus' ? 'Foco' : tipo === 'short_break' ? 'Pausa Curta' : 'Pausa Longa'}.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                color="success"
                onClick={() => {
                  setFinished(false);
                  navigate('/tasks');
                }}
                size="small"
              >
                Voltar para Tarefas
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => {
                  setFinished(false);
                  setSeconds(initialSeconds);
                }}
                size="small"
              >
                Iniciar Novo Timer
              </Button>
            </Stack>
          </Alert>
        )}

        {/* Warning - Sem Tarefa */}
        {!taskId && (
          <Alert severity="info">
            ⚠️ Para uma melhor experiência, selecione uma tarefa antes de iniciar o Pomodoro.
          </Alert>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={4}>
              {/* ID da Tarefa - Input */}
              {!pomodoro && (
                <Box>
                  <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
                    📋 ID da Tarefa (Opcional)
                  </Typography>
                  <input
                    type="number"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    placeholder="Digite o ID da tarefa ou deixe em branco"
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      width: '100%',
                      boxSizing: 'border-box',
                      transition: 'border 0.3s'
                    }}
                    onFocus={(e) => e.target.style.border = '2px solid #1976d2'}
                    onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                    disabled={running}
                  />
                </Box>
              )}

              {/* Pomodoro Info */}
              {pomodoro && (
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Tarefa:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{taskId || 'Sem Tarefa'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">ID Pomodoro:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{pomodoro.id}</Typography>
                    </Box>
                  </Stack>
                </Box>
              )}

              {/* Tipo de Sessão */}
              <Box>
                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
                  🎯 Tipo de Sessão
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  <ToggleButtonGroup
                    value={tipo}
                    exclusive
                    onChange={(e, v) => v && setTipo(v)}
                    disabled={running}
                    fullWidth
                  >
                    <ToggleButton value="focus" sx={{ flex: 1 }}>🎯 Foco</ToggleButton>
                    <ToggleButton value="short_break" sx={{ flex: 1 }}>☕ Pausa Curta</ToggleButton>
                    <ToggleButton value="long_break" sx={{ flex: 1 }}>🌳 Pausa Longa</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </Box>

              {/* Timer Display */}
              <Stack alignItems="center" spacing={2}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={(initialSeconds - seconds) / initialSeconds * 100}
                    size={240}
                    thickness={3}
                    sx={{
                      color: tipo === 'focus' ? '#1976d2' : tipo === 'short_break' ? '#388e3c' : '#f57c00'
                    }}
                  />
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: tipo === 'focus' ? '#1976d2' : tipo === 'short_break' ? '#388e3c' : '#f57c00'
                    }}
                  >
                    {String(Math.floor(seconds / 60)).padStart(2, '0')}:
                    {String(seconds % 60).padStart(2, '0')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {tipo === 'focus' ? '🎯 Sessão de Foco' : tipo === 'short_break' ? '☕ Pausa Curta' : '🌳 Pausa Longa'}
                </Typography>
              </Stack>

              {/* Controls */}
              <Stack direction="row" spacing={2} justifyContent="center">
                {!running ? (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={handleStart}
                    sx={{ px: 4, fontWeight: 700 }}
                  >
                    Iniciar
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    color="warning" 
                    size="large"
                    onClick={() => setRunning(false)}
                    sx={{ px: 4, fontWeight: 700 }}
                  >
                    ⏸️ Pausar
                  </Button>
                )}
                <Button 
                  variant="outlined" 
                  onClick={() => setSeconds(initialSeconds)} 
                  disabled={running}
                  size="large"
                  sx={{ px: 4, fontWeight: 700 }}
                >
                  🔄 Reset
                </Button>
                {/* Test sound button (debug) */}
                <Button
                  variant="text"
                  startIcon={<VolumeUp />}
                  onClick={() => {
                    try { playNotificationSound(); console.log('Teste de som acionado'); } catch (e) { console.warn(e) }
                  }}
                  size="large"
                >
                  Testar Som
                </Button>
                {pomodoro && (
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="large"
                    startIcon={<Stop />}
                    onClick={handleFinish}
                    sx={{ px: 4, fontWeight: 700 }}
                  >
                    Finalizar
                  </Button>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Dica */}
        <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              💡 Dica: Para rastrear seu progresso, selecione uma tarefa antes de iniciar o Pomodoro.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
