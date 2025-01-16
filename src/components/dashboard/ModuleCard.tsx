interface ModuleCardProps {
    name: string;
    img: string;
    url: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ name, img, url }) => {
    const redirect = () => {
        window.location.href = url;
    };

    return (
        <div
            onClick={redirect}
            className="w-[400px] h-[300px] rounded-lg shadow-lg cursor-pointer relative group overflow-hidden"
        >
            {/* Imagen de la tarjeta */}
            <img
                src={img}
                alt={`Acceso al módulo ${name}`}
                className="w-full h-full rounded-lg object-cover transform transition-transform duration-500 group-hover:scale-110"
            />

            {/* Efecto de zoom y oscurecimiento */}
            <div className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-500 group-hover:bg-opacity-50"></div>

            {/* Nombre del módulo */}
            <p className="absolute inset-0 flex items-center justify-center text-4xl text-white font-black">
                {name}
            </p>
        </div>
    );
};

export default ModuleCard;