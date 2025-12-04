import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Stack, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useAuthStore from '../stores/authStore';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ mode, setMode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" elevation={2} sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton color="inherit" edge="start">
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
          >
            ⏱️ Pomodoro Pro
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          {user && (
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/dashboard"
                sx={{ 
                  fontWeight: isActive('/dashboard') ? 700 : 500,
                  borderBottom: isActive('/dashboard') ? '3px solid white' : 'none',
                  pb: isActive('/dashboard') ? '6px' : '8px'
                }}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/tasks"
                sx={{ 
                  fontWeight: isActive('/tasks') ? 700 : 500,
                  borderBottom: isActive('/tasks') ? '3px solid white' : 'none',
                  pb: isActive('/tasks') ? '6px' : '8px'
                }}
              >
                Tarefas
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/tags"
                sx={{ 
                  fontWeight: isActive('/tags') ? 700 : 500,
                  borderBottom: isActive('/tags') ? '3px solid white' : 'none',
                  pb: isActive('/tags') ? '6px' : '8px'
                }}
              >
                Tags
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/reports"
                sx={{ 
                  fontWeight: isActive('/reports') ? 700 : 500,
                  borderBottom: isActive('/reports') ? '3px solid white' : 'none',
                  pb: isActive('/reports') ? '6px' : '8px'
                }}
              >
                Relatórios
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/settings"
                sx={{ 
                  fontWeight: isActive('/settings') ? 700 : 500,
                  borderBottom: isActive('/settings') ? '3px solid white' : 'none',
                  pb: isActive('/settings') ? '6px' : '8px'
                }}
              >
                Config
              </Button>
            </Box>
          )}

          <IconButton color="inherit" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {user ? (
            <Button 
              color="error" 
              variant="contained" 
              onClick={() => { logout(); navigate('/login') }}
              sx={{ fontWeight: 700 }}
            >
              Sair
            </Button>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              <Button color="inherit" component={Link} to="/login">Entrar</Button>
              <Button color="inherit" component={Link} to="/register">Registrar</Button>
            </Box>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
