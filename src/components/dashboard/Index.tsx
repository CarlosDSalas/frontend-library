import ModuleCard from "./ModuleCard";
import moduleUsersImage from "../../assets/images/module-users-image.webp";
import moduleBooksImage from "../../assets/images/module-books-image.webp";

const Dashboard = () => {
    return (
        <section className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black">¿Qué deseas consultar?</h1>

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
        </section>
    )
}

export default Dashboard;