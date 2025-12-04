import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { listTasks } from '../services/task.service'
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TableSortLabel,
  TablePagination
} from '@mui/material'
import { BarChart as BarChartIcon, Search } from '@mui/icons-material'

export default function Reports() {
  const [tabIndex, setTabIndex] = useState(0)
  const [diariaData, setDiariaData] = useState(null)
  const [semanalData, setSemanalData] = useState(null)
  const [mensalData, setMensalData] = useState(null)
  const [tasks, setTasks] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [taskReport, setTaskReport] = useState(null)
  const [taskStats, setTaskStats] = useState(null)
  const [loadingTaskReport, setLoadingTaskReport] = useState(false)
  const [taskError, setTaskError] = useState(null)
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAllReports()
  }, [])

  async function loadAllReports() {
    setLoading(true)
    setError(null)
    try {
      const [diaria, semanal, mensal] = await Promise.all([
        api.get('/relatorios/diario'),
        api.get('/relatorios/semanal'),
        api.get('/relatorios/mensal')
      ])
      setDiariaData(diaria.data)
      setSemanalData(semanal.data)
      setMensalData(mensal.data)

      // Carregar tarefas usando o serviço de tarefas (padrão: /tasks)
      try {
        const tasksRes = await listTasks()
        const parsed = tasksRes.data?.data || tasksRes.data || []
        setTasks(Array.isArray(parsed) ? parsed : [])
      } catch (taskErr) {
        console.warn('Não foi possível carregar tarefas:', taskErr)
        setTasks([])
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar relatórios')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  function formatSeconds(seconds) {
    const totalSeconds = Number(seconds)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`
    if (minutes > 0) return `${minutes}m ${secs}s`
    return `${secs}s`
  }

  async function loadTaskReport(taskId) {
    if (!taskId) return
    setTaskError(null)
    setTaskReport(null)
    setLoadingTaskReport(true)
    try {
      const res = await api.get(`/relatorios/tarefas/${taskId}/pomodoros`)
      // Tentar extrair um array do corpo da resposta em formatos comuns
      let data = []
      // Caso comum usado pela API que você colou: { pomodoros: { data: [...] }, stats: { ... } }
      if (Array.isArray(res.data)) data = res.data
      else if (Array.isArray(res.data?.data)) data = res.data.data
      else if (Array.isArray(res.data?.pomodoros)) data = res.data.pomodoros
      else if (Array.isArray(res.data?.pomodoros?.data)) data = res.data.pomodoros.data
      else if (Array.isArray(res.data?.results)) data = res.data.results
      else if (Array.isArray(res.data?.items)) data = res.data.items
      else if (res.data && typeof res.data === 'object') {
        // buscar a primeira propriedade que for array (ex: data dentro de pomodoros)
        const firstArray = Object.values(res.data).find(v => Array.isArray(v))
        if (firstArray) data = firstArray
        // fallback: procurar array dentro de objetos (ex: pomodoros.data)
        if ((!data || data.length === 0) && typeof res.data === 'object') {
          const nestedArray = Object.values(res.data).map(v => (v && typeof v === 'object') ? Object.values(v).find(x => Array.isArray(x)) : null).find(Boolean)
          if (nestedArray) data = nestedArray
        }
      }

      // Log para depuração se nenhum dado for encontrado
      if (!data || data.length === 0) {
        console.debug('Resposta do endpoint /relatorios/tarefas/:id/pomodoros:', res.data)
      }

      // Normalizar campos para a UI: garantir `inicio` e `duracao_segundos` existam
      const normalized = (Array.isArray(data) ? data : []).map((item) => ({
        ...item,
        inicio: item.iniciado_em || item.inicio || item.created_at || null,
        duracao_segundos: item.duracao_segundos ?? item.duracao ?? null
      }))

      // Se o backend enviar estatísticas (stats), armazenar para possível exibição
      if (res.data?.stats && typeof res.data.stats === 'object') {
        setTaskStats(res.data.stats)
      } else {
        setTaskStats(null)
      }

      setTaskReport(normalized)
      setPage(0)
    } catch (err) {
      console.error('Erro ao carregar relatório por tarefa:', err)
      setTaskError(err.response?.data?.message || 'Erro ao carregar relatório da tarefa')
    } finally {
      setLoadingTaskReport(false)
    }
  }

  // Sorting & pagination helpers (client-side)
  function descendingComparator(a, b, orderByKey) {
    const va = a[orderByKey]
    const vb = b[orderByKey]
    if (va == null && vb == null) return 0
    if (va == null) return -1
    if (vb == null) return 1
    if (!isNaN(Number(va)) && !isNaN(Number(vb))) return Number(vb) - Number(va)
    const da = Date.parse(va)
    const db = Date.parse(vb)
    if (!isNaN(da) && !isNaN(db)) return db - da
    return String(vb).localeCompare(String(va))
  }

  function getComparator(ord, orderByKey) {
    return ord === 'desc'
      ? (a, b) => descendingComparator(a, b, orderByKey)
      : (a, b) => -descendingComparator(a, b, orderByKey)
  }

  function stableSort(array, comparator) {
    const stabilized = array.map((el, idx) => [el, idx])
    stabilized.sort((a, b) => {
      const cmp = comparator(a[0], b[0])
      if (cmp !== 0) return cmp
      return a[1] - b[1]
    })
    return stabilized.map((el) => el[0])
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
  if (error) return <Alert severity="error">Erro ao carregar relatórios: {error}</Alert>

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <BarChartIcon sx={{ fontSize: 32, color: '#1976d2' }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          📊 Relatórios de Sessões
        </Typography>
      </Stack>

      {/* Tabs para selecionar tipo de relatório */}
      <Card sx={{ boxShadow: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        >
          <Tab label="📅 Diário" />
          <Tab label="📆 Semanal" />
          <Tab label="📋 Mensal" />
          <Tab label="🔎 Por Tarefa" />
        </Tabs>

        <CardContent sx={{ p: 3 }}>
          {/* RELATÓRIO DIÁRIO */}
          {tabIndex === 0 && diariaData && (
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Resumo de Hoje - {diariaData.date}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 1 }}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Total de Tempo
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
                        {formatSeconds(diariaData.total_segundos)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ backgroundColor: '#e8f5e9', boxShadow: 1 }}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Total de Pomodoros
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#388e3c' }}>
                        {diariaData.pomodoros}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ backgroundColor: '#fff3e0', boxShadow: 1 }}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Tempo Médio
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#f57c00' }}>
                        {diariaData.pomodoros > 0
                          ? formatSeconds(Number(diariaData.total_segundos) / diariaData.pomodoros)
                          : '0m'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* RELATÓRIO SEMANAL */}
          {tabIndex === 1 && semanalData && Array.isArray(semanalData) && (
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Resumo da Semana
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>📅 Data</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">⏱️ Tempo Total</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">🎯 Pomodoros</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {semanalData.map((dia, idx) => (
                      <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <TableCell>{dia.dia}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 500 }}>
                          {formatSeconds(dia.total_segundos)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 500 }}>
                          {dia.foco_count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 0, border: '1px solid #e0e0e0' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-around">
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Semanal
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                        {formatSeconds(
                          semanalData.reduce((sum, dia) => sum + Number(dia.total_segundos), 0)
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Total de Pomodoros
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#388e3c' }}>
                        {semanalData.reduce((sum, dia) => sum + Number(dia.foco_count), 0)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          )}

          {/* RELATÓRIO MENSAL */}
          {tabIndex === 2 && mensalData && Array.isArray(mensalData) && (
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Resumo do Mês
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>📅 Data</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">⏱️ Tempo Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mensalData.map((dia, idx) => (
                      <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <TableCell>{dia.dia}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 500 }}>
                          {formatSeconds(dia.total_segundos)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 0, border: '1px solid #e0e0e0' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total do Mês
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
                      {formatSeconds(
                        mensalData.reduce((sum, dia) => sum + Number(dia.total_segundos), 0)
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          )}

          {/* RELATÓRIO POR TAREFA */}
          {tabIndex === 3 && (
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Relatório por Tarefa
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <FormControl sx={{ minWidth: 240 }} size="small">
                  <InputLabel id="select-task-label">Selecione a Tarefa</InputLabel>
                  <Select
                    labelId="select-task-label"
                    value={selectedTaskId}
                    label="Selecione a Tarefa"
                    onChange={(e) => setSelectedTaskId(e.target.value)}
                  >
                    <MenuItem value="">-- Selecione --</MenuItem>
                    {tasks.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.titulo || `Tarefa #${t.id}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  startIcon={<Search />}
                  disabled={!selectedTaskId}
                  onClick={() => loadTaskReport(selectedTaskId)}
                >
                  Carregar
                </Button>
              </Stack>

              {loadingTaskReport && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 2 }} />}
              {taskError && <Alert severity="error">{taskError}</Alert>}

              {taskStats && (
                <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 0, border: '1px solid #e0e0e0', mt: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{taskStats.tarefa_titulo || `Tarefa #${taskStats.tarefa_id}`}</Typography>
                    <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Pomodoros</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{taskStats.pomodoros_concluidos ?? taskStats.pomodoros_foco_count ?? '-'}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Duração</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{formatSeconds(taskStats.duracao_total_segundos ?? taskStats.total_segundos ?? 0)}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {taskReport && Array.isArray(taskReport) && (
                <>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Resultado: {taskReport.length} registros
                  </Typography>
                  <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }} sortDirection={orderBy === 'id' ? order : false}>
                            <TableSortLabel
                              active={orderBy === 'id'}
                              direction={orderBy === 'id' ? order : 'asc'}
                              onClick={(e) => handleRequestSort(e, 'id')}
                            >
                              ID
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }} sortDirection={orderBy === 'inicio' ? order : false}>
                            <TableSortLabel
                              active={orderBy === 'inicio'}
                              direction={orderBy === 'inicio' ? order : 'asc'}
                              onClick={(e) => handleRequestSort(e, 'inicio')}
                            >
                              Início
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }} align="right" sortDirection={orderBy === 'duracao_segundos' ? order : false}>
                            <TableSortLabel
                              active={orderBy === 'duracao_segundos'}
                              direction={orderBy === 'duracao_segundos' ? order : 'asc'}
                              onClick={(e) => handleRequestSort(e, 'duracao_segundos')}
                            >
                              Duração
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }} align="right" sortDirection={orderBy === 'tipo' ? order : false}>
                            <TableSortLabel
                              active={orderBy === 'tipo'}
                              direction={orderBy === 'tipo' ? order : 'asc'}
                              onClick={(e) => handleRequestSort(e, 'tipo')}
                            >
                              Tipo
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }} align="right" sortDirection={orderBy === 'concluido' ? order : false}>
                            <TableSortLabel
                              active={orderBy === 'concluido'}
                              direction={orderBy === 'concluido' ? order : 'asc'}
                              onClick={(e) => handleRequestSort(e, 'concluido')}
                            >
                              Concluído
                            </TableSortLabel>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(() => {
                          const sorted = stableSort(taskReport, getComparator(order, orderBy))
                          const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          return paginated.map((p) => (
                            <TableRow key={p.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                              <TableCell>{p.id}</TableCell>
                              <TableCell>{p.inicio ? new Date(p.inicio).toLocaleString() : (p.created_at ? new Date(p.created_at).toLocaleString() : '-')}</TableCell>
                              <TableCell align="right">{formatSeconds(p.duracao_segundos || p.duracao || 0)}</TableCell>
                              <TableCell align="right">{p.tipo || '-'}</TableCell>
                              <TableCell align="right">{p.concluido ? '✅' : '—'}</TableCell>
                            </TableRow>
                          ))
                        })()}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={taskReport.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  )
}
