import ModuleCard from "./ModuleCard";
import moduleUsersImage from "../../assets/images/module-users-image.webp";
import moduleBooksImage from "../../assets/images/module-books-image.webp";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <section className="h-full flex flex-col gap-8 justify-center items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center">¿Qué deseas consultar?</h1>

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
    )
}

export default Dashboard;