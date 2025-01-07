import {ThemeProvider} from './components/theme-provider'
import Navbar from './components/Navbar/Navbar'
import Todo from './components/Todo/Todo'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <Navbar/>
      <Todo/>
      <Toaster />
    </ThemeProvider>
  )
}

export default App