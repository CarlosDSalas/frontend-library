import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Dashboard from "./components/dashboard/Index.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);
