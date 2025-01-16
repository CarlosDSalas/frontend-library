import FormField from "./FormField";
import loginFormImage from "../../assets/images/login-form-image.webp";

const LogIn = () => {
    return (
        <div className="w-fit lg:w-[950px] h-[600px] flex items-center justify-center flex-col lg:flex-row rounded-lg shadow-2xl">
            {/* Imagen del lado izquierdo */}
            <div className="hidden lg:block w-1/3 h-full rounded-l-lg">
                <img src={loginFormImage}
                    className="w-full h-full rounded-l-lg object-cover"
                    alt="Library" />
            </div>

            {/* Formulario del lado derecho */}
            <div className="w-full lg:w-2/3 h-full flex flex-col items-center justify-center gap-16 rounded-r-lg p-16">
                <h1 className="text-6xl font-black">Mi Librería</h1>

                <form className="w-full space-y-6 rounded-lg">
                    {/* Campo de correo electrónico */}
                    <FormField
                        type={"email"}
                        label={"Correo electrónico"}
                        placeholder={"Ingresa tu correo electrónico"}
                    />

                    {/* Campo de contraseña */}
                    <FormField
                        type={"password"}
                        label={"Contraseña"}
                        placeholder={"Ingresa tu contraseña"}
                    />

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-full bg-orange-400 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-orange-600 transition-all duration-300 ease-in-out"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;