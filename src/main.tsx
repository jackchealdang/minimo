import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { SupabaseProvider } from './contexts/SupabaseContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SupabaseProvider>
          <AuthProvider>
            <Router>
              <App />
            </Router>
          </AuthProvider>
        </SupabaseProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
