import {ThemeProvider} from './components/theme-provider'
import Navbar from './components/Navbar/Navbar'
import Todo from './components/Todo/Todo'
import { Toaster } from './components/ui/sonner'
import { TodosProvider } from './contexts/TodoContext'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <TodosProvider>
        <Navbar/>
        <Todo/>
      </TodosProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default App