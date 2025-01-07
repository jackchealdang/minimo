import {ThemeProvider} from './components/theme-provider'
import Navbar from './components/Navbar/Navbar'
import Todo from './components/Todo/Todo'
import { CreateTodoForm } from './components/CreateTodoForm/CreateTodoForm'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <Navbar/>
      <Todo/>
    </ThemeProvider>
  )
}

export default App