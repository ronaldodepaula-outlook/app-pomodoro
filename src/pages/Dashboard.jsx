import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { 
	Card, CardContent, Typography, Stack, Grid, CircularProgress, Alert, Button, 
	LinearProgress, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material'
import { 
	Timer, TaskAlt, TrendingUp, PlayArrow, Add, BarChart as BarChartIcon,
	CheckCircle, WarningAmber, LocalFireDepartment, EmojiEvents
} from '@mui/icons-material'

export default function Dashboard() {
	const navigate = useNavigate()
	const [stats, setStats] = useState(null)
	const [tasks, setTasks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [openTaskDialog, setOpenTaskDialog] = useState(false)

	useEffect(() => {
		loadDashboardData()
	}, [])

	async function loadDashboardData() {
		setLoading(true)
		setError(null)
		try {
			const [diaria, semanal] = await Promise.all([
				api.get('/relatorios/diario'),
				api.get('/relatorios/semanal')
			])
			
			const semanalTotal = Array.isArray(semanal.data)
				? semanal.data.reduce((sum, dia) => sum + Number(dia.total_segundos), 0)
				: 0

			setStats({
				today: diaria.data,
				weekTotal: semanalTotal
			})

			// Carregar tarefas separadamente para não bloquear se falhar
			try {
				const taskRes = await api.get('/tarefas')
				setTasks(Array.isArray(taskRes.data) ? taskRes.data.slice(0, 3) : [])
			} catch (taskErr) {
				// Se tarefas falhar, apenas deixar vazio
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
		if (hours > 0) return `${hours}h ${minutes}m`
		if (minutes > 0) return `${minutes}m`
		return `${totalSeconds}s`
	}

	function getProductivityLevel() {
		const today = Number(stats?.today?.total_segundos || 0)
		if (today >= 3600) return { level: 'Excelente', color: '#388e3c', icon: <LocalFireDepartment sx={{ color: '#388e3c' }} /> }
		if (today >= 1800) return { level: 'Ótimo', color: '#1976d2', icon: <EmojiEvents sx={{ color: '#1976d2' }} /> }
		if (today >= 900) return { level: 'Bom', color: '#f57c00', icon: <TrendingUp sx={{ color: '#f57c00' }} /> }
		return { level: 'Iniciante', color: '#757575', icon: <WarningAmber sx={{ color: '#757575' }} /> }
	}

	function getProgressPercentage() {
		const today = Number(stats?.today?.total_segundos || 0)
		const goal = 7200 // 2 horas como meta diária
		return Math.min(100, (today / goal) * 100)
	}

	if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
	if (error) return <Alert severity="error">{error}</Alert>

	const productivity = getProductivityLevel()
	const progressPercent = getProgressPercentage()

	return (
		<Stack spacing={4}>
			{/* Header com Boas-vindas */}
			<Box sx={{ 
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				borderRadius: 3,
				p: 4,
				color: 'white',
				boxShadow: 3
			}}>
				<Stack spacing={2}>
					<Typography variant="h5" sx={{ fontWeight: 700 }}>
						🎯 Bem-vindo de volta!
					</Typography>
					<Typography variant="body1" sx={{ opacity: 0.95 }}>
						Você está em uma sequência incrível. Continue focando e alcance suas metas! 🚀
					</Typography>
					<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', pt: 1 }}>
						<Chip 
							label={`📅 ${stats?.today?.date}`}
							sx={{ backgroundColor: 'rgba(255,255,255,0.3)', color: 'white' }}
						/>
						<Chip 
							label={`${productivity.icon} ${productivity.level}`}
							sx={{ backgroundColor: 'rgba(255,255,255,0.3)', color: 'white' }}
						/>
					</Box>
				</Stack>
			</Box>

			{/* Cards de Métricas Principais */}
			<Grid container spacing={3}>
				{/* Card 1: Pomodoros Hoje */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ 
						boxShadow: 2, 
						transition: 'all 0.3s ease',
						height: '100%',
						'&:hover': { boxShadow: 5, transform: 'translateY(-4px)' } 
					}}>
						<CardContent>
							<Stack spacing={2}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
										Pomodoros Hoje
									</Typography>
									<Timer sx={{ fontSize: 24, color: '#1976d2' }} />
								</Box>
								<Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
									{stats?.today?.pomodoros || 0}
								</Typography>
								<Typography variant="caption" sx={{ color: '#757575' }}>
									{stats?.today?.pomodoros > 0 ? '✅ Você está produtivo!' : '⏰ Comece seu primeiro pomodoro'}
								</Typography>
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				{/* Card 2: Tempo Total Hoje */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ 
						boxShadow: 2, 
						transition: 'all 0.3s ease',
						height: '100%',
						'&:hover': { boxShadow: 5, transform: 'translateY(-4px)' } 
					}}>
						<CardContent>
							<Stack spacing={2}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
										Tempo Hoje
									</Typography>
									<BarChartIcon sx={{ fontSize: 24, color: '#388e3c' }} />
								</Box>
								<Typography variant="h4" sx={{ fontWeight: 700, color: '#388e3c' }}>
									{formatSeconds(stats?.today?.total_segundos || 0)}
								</Typography>
								<LinearProgress 
									variant="determinate" 
									value={progressPercent} 
									sx={{ height: 6, borderRadius: 3, backgroundColor: '#e0e0e0' }}
								/>
								<Typography variant="caption" sx={{ color: '#757575', textAlign: 'right' }}>
									Meta diária: 2h ({Math.round(progressPercent)}%)
								</Typography>
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				{/* Card 3: Tempo Semanal */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ 
						boxShadow: 2, 
						transition: 'all 0.3s ease',
						height: '100%',
						'&:hover': { boxShadow: 5, transform: 'translateY(-4px)' } 
					}}>
						<CardContent>
							<Stack spacing={2}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
										Semana
									</Typography>
									<TrendingUp sx={{ fontSize: 24, color: '#f57c00' }} />
								</Box>
								<Typography variant="h4" sx={{ fontWeight: 700, color: '#f57c00' }}>
									{formatSeconds(stats?.weekTotal || 0)}
								</Typography>
								<Typography variant="caption" sx={{ color: '#757575' }}>
									📊 Média: {formatSeconds((stats?.weekTotal || 0) / 7)} por dia
								</Typography>
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				{/* Card 4: Nível de Produtividade */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ 
						boxShadow: 2, 
						transition: 'all 0.3s ease',
						height: '100%',
						'&:hover': { boxShadow: 5, transform: 'translateY(-4px)' },
						background: `linear-gradient(135deg, ${productivity.color}15 0%, ${productivity.color}30 100%)`
					}}>
						<CardContent>
							<Stack spacing={2} alignItems="center" sx={{ textAlign: 'center' }}>
								<Box sx={{ fontSize: 40 }}>
									{productivity.icon}
								</Box>
								<Stack spacing={0.5}>
									<Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
										Nível de Produtividade
									</Typography>
									<Typography variant="h5" sx={{ fontWeight: 700, color: productivity.color }}>
										{productivity.level}
									</Typography>
								</Stack>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* Seção de Tarefas Rápidas */}
			<Box>
				<Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
					✨ Tarefas em Destaque
				</Typography>
				<Grid container spacing={2}>
					{tasks.length > 0 ? (
						tasks.map(task => (
							<Grid item xs={12} sm={6} md={4} key={task.id}>
								<Card sx={{ 
									boxShadow: 1,
									transition: 'all 0.3s ease',
									'&:hover': { boxShadow: 3, transform: 'translateY(-2px)' }
								}}>
									<CardContent sx={{ pb: 1.5 }}>
										<Stack spacing={2}>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 1 }}>
												<Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
													{task.titulo || 'Sem título'}
												</Typography>
												<Chip 
													label={task.status || 'Pendente'}
													size="small"
													color={task.status === 'Concluída' ? 'success' : 'default'}
													icon={task.status === 'Concluída' ? <CheckCircle /> : undefined}
												/>
											</Box>
											<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
												{task.descricao || 'Sem descrição'}
											</Typography>
											<Button
												variant="contained"
												size="small"
												startIcon={<PlayArrow />}
												onClick={() => navigate(`/timer?taskId=${task.id}`)}
												fullWidth
												sx={{ textTransform: 'none', fontWeight: 600 }}
											>
												Iniciar Pomodoro
											</Button>
										</Stack>
									</CardContent>
								</Card>
							</Grid>
						))
					) : (
						<Grid item xs={12}>
							<Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 1 }}>
								<CardContent sx={{ textAlign: 'center', py: 4 }}>
									<TaskAlt sx={{ fontSize: 48, color: '#bdbdbd', mb: 2 }} />
									<Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
										Nenhuma tarefa criada ainda
									</Typography>
									<Button
										variant="contained"
										startIcon={<Add />}
										onClick={() => navigate('/tasks/new')}
										sx={{ textTransform: 'none' }}
									>
										Criar Primeira Tarefa
									</Button>
								</CardContent>
							</Card>
						</Grid>
					)}
				</Grid>
			</Box>

			{/* Seção de Ações Rápidas */}
			<Box>
				<Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
					⚡ Ações Rápidas
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<Button
							variant="contained"
							fullWidth
							startIcon={<PlayArrow />}
							onClick={() => navigate('/timer')}
							sx={{ py: 2, textTransform: 'none', fontSize: '1rem' }}
						>
							Iniciar Pomodoro
						</Button>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Button
							variant="contained"
							color="success"
							fullWidth
							startIcon={<Add />}
							onClick={() => navigate('/tasks/new')}
							sx={{ py: 2, textTransform: 'none', fontSize: '1rem' }}
						>
							Nova Tarefa
						</Button>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Button
							variant="contained"
							color="info"
							fullWidth
							startIcon={<TaskAlt />}
							onClick={() => navigate('/tasks')}
							sx={{ py: 2, textTransform: 'none', fontSize: '1rem' }}
						>
							Ver Tarefas
						</Button>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Button
							variant="contained"
							color="warning"
							fullWidth
							startIcon={<BarChartIcon />}
							onClick={() => navigate('/reports')}
							sx={{ py: 2, textTransform: 'none', fontSize: '1rem' }}
						>
							Relatórios
						</Button>
					</Grid>
				</Grid>
			</Box>

			{/* Card de Motivação */}
			<Card sx={{ 
				boxShadow: 2, 
				background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
				color: 'white'
			}}>
				<CardContent>
					<Stack spacing={1}>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>
							💡 Dica do Dia
						</Typography>
						<Typography variant="body2">
							{progressPercent >= 100 
								? '🎉 Parabéns! Você atingiu sua meta diária!' 
								: `🎯 Você já completou ${Math.round(progressPercent)}% de sua meta. ${Math.ceil((100 - progressPercent) / 25) * 25} minutos mais e você chega lá!`}
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Stack>
	)
}
