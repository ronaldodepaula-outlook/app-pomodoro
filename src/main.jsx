import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './theme'
import useAuthStore from './stores/authStore'

// Carregar sessão ANTES de renderizar a aplicação
useAuthStore.getState().loadFromStorage()

export default function Root() {
  const [mode, setMode] = React.useState('light')

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App setMode={setMode} mode={mode} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
