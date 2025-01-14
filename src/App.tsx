import {
  Routes,
  Route
} from "react-router-dom";
import { Toaster } from './components/ui/sonner'
import './App.css';
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
        <Routes>
          <Route path="todo-supabase" element={<HomePage />}/>
          <Route path="todo-supabase/login" element={<LoginPage/>}/>
          <Route path="todo-supabase/signup" element={<SignupPage/>}/>
        </Routes>
      <Toaster />
    </ThemeProvider>
    </>
  )
}

export default App