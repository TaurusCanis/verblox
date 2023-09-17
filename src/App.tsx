import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import "./App.css";

function App() {

  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  )
}

export default App
