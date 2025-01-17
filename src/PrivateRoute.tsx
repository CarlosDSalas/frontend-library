import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("http://127.0.0.1:8000/auth/user", { withCredentials: true });
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Cargando...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;