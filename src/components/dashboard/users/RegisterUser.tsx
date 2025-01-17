import React, { useState } from "react";
import axios, { isAxiosError } from "axios";
import FormField from "../../login/FormField";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/auth/register",
                { name, email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setName("");
                setEmail("");
                setPassword("");
                onClose();
            }
        } catch (err: any) {
            if (isAxiosError(err) && err.response) {
                setError(err.response.data.message)
                console.log(err)
            } else {
                setError("Error inesperado")
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
                >
                    &times;
                </button>

                <h2 className="text-black text-2xl font-bold text-center">Registrar Cliente</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <FormField
                        type={"text"}
                        label={"Nombre"}
                        placeholder={"Nombre"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Correo */}
                    <FormField
                        type={"email"}
                        label={"Correo electrónico"}
                        placeholder={"Correo electrónico"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Contraseña */}
                    <FormField
                        type={"password"}
                        label={"Contraseña"}
                        placeholder={"Contraseña"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;