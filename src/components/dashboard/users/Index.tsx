import { useEffect, useState } from "react";
import RegisterUser from "./RegisterUser";
import axiosInstance from "../../../api/axiosInstance";
import { isAxiosError } from "axios";
import Toaster, { useToaster } from "../../utils/Toaster";

export interface User {
    id: number;
    name: string;
    email: string;
}

const DashboardUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    /* Usa el hook useToaster */
    const { isToasterOpen, isSuccess, messageToaster, showToaster } = useToaster();

    /* Obtiene los usuarios */
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("/users");
            setUsers(response.data);
        } catch (err) {
            if (isAxiosError(err) && err.status == 401) {
                window.location.href = "/";
            } else {
                showToaster(false, "Error al cargar los usuarios");
            }
        } finally {
            setIsLoading(false);
        }
    };

    /* Envía la solicitud para eliminar un usuario */
    const handleDelete = async (userId: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/users/${userId}`);
            showToaster(true, "Usuario eliminado correctamente");
            fetchUsers(); // Actualiza la lista de usuarios después de eliminar
        } catch (err) {
            showToaster(false, "Error al eliminar el usuario");
        }
    };

    /* Cierra el modal y obtiene los usuarios */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null); // Reinicia usuario en edición
        fetchUsers();
    };

    /* Obtiene los usuarios al cargar el componente */
    useEffect(() => {
        fetchUsers();
    }, []);

    /* Mientras son cargados los usuarios, muestra un loader */
    if (isLoading === null) {
        return <div>Cargando usuarios...</div>;
    }

    return (
        <section className="w-full flex flex-col gap-8">
            {/* Encabezado principal; Título y Botón para agregar nuevo usuario */}
            <div className="flex justify-between">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">Usuarios</h1>
                <button onClick={() => setIsModalOpen(true)}>Nuevo usuario</button>
            </div>

            {/* Tabla de usuarios */}
            <div className="overflow-x-auto w-full">
                {/* Tabla de libros */}
                <table className="min-w-full table-auto">
                    {/* Encabezado */}
                    <thead className="bg-gray-300 text-black">
                        <tr>
                            <th className="px-4 py-2 text-center rounded-tl-lg">ID</th>
                            <th className="px-4 py-2 text-center">Nombre</th>
                            <th className="px-4 py-2 text-center">Correo</th>
                            <th className="px-4 py-2 text-center rounded-tr-lg">Acciones</th>
                        </tr>
                    </thead>
                    {/* Contenido */}
                    <tbody>
                        {/* Si hay usuarios por mostrar */}
                        {users && users.length > 0 ? (
                            users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`text-black text-center border-b ${index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}`}
                                >
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2 flex flex-col md:flex-row gap-2 justify-center">
                                        <button onClick={() => {
                                            setEditingUser(user);
                                            setIsModalOpen(true);
                                        }}>
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Si no hay usuarios por mostrar, lo indica
                            <tr>
                                <td colSpan={4} className="bg-white border px-4 py-2 text-black text-center">
                                    No hay usuarios por mostrar
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Registro y Edición de usuarios */}
            <RegisterUser
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                editingUser={editingUser}
            />

            {/* Mensaje flotante */}
            <Toaster isOpen={isToasterOpen} isSuccess={isSuccess} statusMessage={messageToaster} />
        </section>
    );
};

export default DashboardUsers;