import {
  Routes,
  Route
} from "react-router-dom";
import { Toaster } from './components/ui/sonner'
import './App.css';
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from "./pages/LoginPage/LoginPage";


function App() {
  return (
    <>
        <Routes>
          <Route path="todo-supabase" element={<HomePage />}/>
          <Route path="todo-supabase/login" element={<LoginPage/>}/>
        </Routes>
      <Toaster />
    </>
  )
}

export default App