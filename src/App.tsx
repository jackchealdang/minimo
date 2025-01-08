import {ThemeProvider} from './components/theme-provider'
import Navbar from './components/Navbar/Navbar'
import Todo from './components/Todo/Todo'
import { Toaster } from './components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SupabaseProvider } from './contexts/SupabaseContext'
import { AuthProvider } from './contexts/AuthContext'

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SupabaseProvider>
          <AuthProvider>
            <Navbar/>
            <Todo/>
          </AuthProvider>
        </SupabaseProvider>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default App