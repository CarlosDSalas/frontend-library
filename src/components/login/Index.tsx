import { useState } from "react";
import FormField from "./FormField";
import loginFormImage from "../../assets/images/login-form-image.webp";
import { isAxiosError } from "axios";
import axiosInstance from "../../api/axiosInstance";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    /* Envía la solicitud de inicio de sesión */
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axiosInstance.post("/auth/login", { email, password });

            // Si la solicitud fue exitosa, redirige al dashboard
            if (response.status === 200) {
                window.location.href = "/dashboard";
            }
        } catch (err) {
            // Si hubo un problema, lo muestra
            if (isAxiosError(err) && err.response) {
                setError(err.response.data.message);
            } else {
                setError("Error inesperado");
            }
        }
    };

    return (
        <section className="h-full flex flex-col justify-center items-center">
            <div className="w-fit lg:w-[950px] h-[600px] flex items-center justify-center flex-col lg:flex-row rounded-lg shadow-2xl">
                {/* Imagen del lado izquierdo */}
                <div className="hidden lg:block w-1/3 h-full rounded-l-lg">
                    <img
                        src={loginFormImage}
                        className="w-full h-full rounded-l-lg object-cover"
                        alt="Library"
                    />
                </div>

                {/* Formulario del lado derecho */}
                <div className="w-full lg:w-2/3 h-full flex flex-col items-center justify-center gap-8 rounded-r-lg p-8">
                    <h1 className="text-4xl lg:text-6xl font-black">Mi Librería</h1>

                    {/* Mensajes de error y éxito */}
                    {error && (
                        <p className="text-red-500 bg-red-100 p-2 rounded-md w-full text-center">
                            {error}
                        </p>
                    )}

                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        {/* Campo de correo electrónico */}
                        <FormField
                            type="email"
                            label="Correo electrónico"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Campo de contraseña */}
                        <FormField
                            type="password"
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Botón de envío */}
                        <button
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LogIn;