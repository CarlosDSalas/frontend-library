import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

interface PrivateRouteProps {
    children: ReactNode;
}

/* 
Componente que valida la autenticación del usuario antes de 
mostrar la ruta a la que intenta acceder
*/
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    /* Valida que el usuario esté autenticado */
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axiosInstance.get("/auth/user");
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    /* Mientras es validado, muestra un loader */
    if (isAuthenticated === null) {
        return <div>Cargando...</div>;
    }

    /* Si está autenticado, muestra el componente deseado, si no, redirecciona al LogIn */
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;