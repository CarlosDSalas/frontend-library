import axios from "axios";
import { useEffect, useState } from "react";
import RegisterUser from "./RegisterUser";

interface User {
    id: number;
    name: string;
    email: string;
}

const DashboardUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* Función para obtener los usuarios */
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/users", { withCredentials: true });
            setUsers(response.data);
        } catch (err) {
            setError("Error al cargar los usuarios");
        } finally {
            setIsLoading(false);
        }
    };

    /* Cierra el modal y obtiene los usuarios */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchUsers();
    }

    /* Obtiene los usuarios al cargar el componente */
    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <section className="w-full flex flex-col gap-8">
            {/* Encabezado superior: Título y Botón para agregar nuevo usuario */}
            <div className="w-full flex justify-between">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">Usuarios</h1>
                <button onClick={() => setIsModalOpen(true)}>
                    Nuevo usuario
                </button>
            </div>

            {/* Tabla de Usuarios */}
            <table className="w-full">
                <thead className="bg-gray-300 text-black">
                    <tr>
                        <th className="px-4 py-2 text-center rounded-tl-lg">ID</th>
                        <th className="px-4 py-2 text-center">Nombre</th>
                        <th className="px-4 py-2 text-center rounded-tr-lg">Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user: User, index: number) => (
                            <tr
                                key={user.id}
                                className={`text-black text-center border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                            >
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="border px-4 py-2 text-center">
                                No hay usuarios por mostrar
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <RegisterUser isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
};

export default DashboardUsers;