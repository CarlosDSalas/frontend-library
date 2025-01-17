import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import './index.css'
import App from './App.tsx'
import Dashboard from "./components/dashboard/Index.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import DashboardUsers from "./components/dashboard/users/Index.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      {/* Ruta del Login */}
      <Route path="/" element={<App />} />

      {/* Rutas del Dashboard */}
      <Route path="dashboard" element={<PrivateRoute><Outlet /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="users" element={<PrivateRoute><DashboardUsers /></PrivateRoute>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
