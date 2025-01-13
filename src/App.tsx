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
          <Route path="/" element={<HomePage />}/>
          <Route path="login" element={<LoginPage/>}/>
        </Routes>
      <Toaster />
    </>
  )
}

export default App