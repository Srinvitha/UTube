import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Watch from "./pages/Watch";
import Dashboard from "./pages/Dashboard";
import Channel from "./pages/Channel";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/search" element={<Search />} />

          <Route path="/upload" element={<Upload />} />

          <Route path="/watch/:id" element={<Watch />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/channel/:id" element={<Channel />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;