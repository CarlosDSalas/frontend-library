import ModuleCard from "./ModuleCard";
import moduleUsersImage from "../../assets/images/module-users-image.webp";
import moduleBooksImage from "../../assets/images/module-books-image.webp";
import { Outlet } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useState, useEffect } from "react";
import { isAxiosError } from "axios";

const Dashboard = () => {
    const [userName, setUserName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean | null>(null);

    /* Obtiene el nombre del usuario */
    const getUserName = async () => {
        try {
            const response = await axiosInstance.get("/auth/user");
            setUserName(response.data.name);
        } catch (err) {
            if (isAxiosError(err)) {
                // Si hubo un problema, redirige al login
                alert("mmm")
                window.location.href = "/";
            }
        } finally {
            setIsLoading(false);
        }
    };

    {/* Obtiene el nombre de usuario al cargar el componente */ }
    useEffect(() => {
        setIsLoading(true);
        getUserName();
    }, []);

    /* Mientras se carga la información, muestra un loader */
    if (isLoading === null || isLoading === true) {
        return <div>Cargando tu información...</div>;
    }

    return (
        <section className="h-full flex flex-col gap-8 justify-center items-center">
            {/* Encabezado */}
            <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center">
                    {userName ? `Bienvenido/a, ${userName}` : "Bienvenido/a"}
                </h1>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-center">
                    ¿Qué deseas consultar?
                </p>
            </div>

            {/* Accesos a los diferentes módulos */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* Módulo de Usuarios */}
                <ModuleCard
                    name={"Usuarios"}
                    img={moduleUsersImage}
                    url={"/dashboard/users"}
                />

                {/* Módulo de Libros */}
                <ModuleCard
                    name={"Libros"}
                    img={moduleBooksImage}
                    url={"/dashboard/books"}
                />
            </div>
            <Outlet />
        </section>
    );
};

export default Dashboard;