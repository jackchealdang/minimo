import {ThemeProvider} from './components/theme-provider'
import Navbar from './components/navbar/Navbar'
import Todo from './components/todo/Todo'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <Navbar/>
      <Todo/>
    </ThemeProvider>
  )
}

export default App