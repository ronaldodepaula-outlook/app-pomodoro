import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' },
    secondary: { main: '#9333ea' },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    },
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3b82f6' },
    secondary: { main: '#a855f7' },
    background: {
      default: '#0f172a',
      paper: '#1e293b'
    },
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  }
});
