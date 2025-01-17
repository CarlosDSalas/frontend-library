import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import './index.css'
import App from './App.tsx'
import Dashboard from "./components/dashboard/Index.tsx";
import PrivateRoute from "./components/utils/PrivateRoute.tsx";
import DashboardUsers from "./components/dashboard/users/Index.tsx";
import DashboardBooks from "./components/dashboard/books/Index.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      {/* Ruta del Login */}
      <Route path="/" element={<App />} />

      {/* Rutas protegidas del Dashboard */}
      <Route path="dashboard" element={<PrivateRoute><Outlet /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="users" element={<PrivateRoute><DashboardUsers /></PrivateRoute>} />
        <Route path="books" element={<PrivateRoute><DashboardBooks /></PrivateRoute>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
