import FormField from "../../login/FormField";
import { useEffect, useState } from "react";
import { User } from "./Index";
import axiosInstance from "../../../api/axiosInstance";
import { isAxiosError } from "axios";
import Toaster, { useToaster } from "../../utils/Toaster";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingUser?: User | null;
}

const RegisterUser: React.FC<RegisterModalProps> = ({ isOpen, onClose, editingUser }) => {
    const [name, setName] = useState(editingUser?.name || "");
    const [email, setEmail] = useState(editingUser?.email || "");
    const [password, setPassword] = useState("");

    /* Usa el hook useToaster */
    const { isToasterOpen, isSuccess, messageToaster, showToaster } = useToaster();

    /* Restaura los valores cuando se esté editando o registrando un usuario */
    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
            setPassword("");
        } else {
            setName("");
            setEmail("");
            setPassword("");
        }
    }, [editingUser]);

    /* Envía la solicitud para editar o registrar un usuario */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingUser) { /* Edita un usuario */
                await axiosInstance.patch(`/users/${editingUser.id}`, { name, email });
            } else { /* Crea un usuario */
                await axiosInstance.post("/auth/register", { name, email, password });
            }

            onClose();
        } catch (err: any) {
            if (isAxiosError(err) && err.response && err.status == 401) {
                showToaster(false, err.response.data.message);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000)
            } else {
                showToaster(false, "Error inesperado");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4 relative">
                <button
                    className="absolute top-4 right-4 text-black"
                    onClick={onClose}
                >x</button>

                <h2 className="text-black text-2xl font-bold text-center">
                    {editingUser ? "Editar Usuario" : "Registrar Usuario"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        type="text"
                        label="Nombre"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <FormField
                        type="email"
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {!editingUser && (
                        <FormField
                            type="password"
                            label="Contraseña"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}

                    <button type="submit">
                        {editingUser ? "Guardar cambios" : "Registrar"}
                    </button>
                </form>
            </div>

            {/* Mensaje flotante */}
            <Toaster isOpen={isToasterOpen} isSuccess={isSuccess} statusMessage={messageToaster} />
        </div>
    );
};

export default RegisterUser;