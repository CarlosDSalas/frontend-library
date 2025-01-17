import { useState, useCallback } from "react";

interface ToasterProps {
    isOpen: boolean;
    isSuccess: boolean;
    statusMessage: string;
}

/* Hook para llamar al Toaster fácilmente */
export const useToaster = () => {
    const [isToasterOpen, setIsToasterOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [messageToaster, setMessageToaster] = useState("");

    const showToaster = useCallback((success: boolean, msg: string) => {
        setIsSuccess(success);
        setMessageToaster(msg);
        setIsToasterOpen(true);
        setTimeout(() => setIsToasterOpen(false), 5000); // Oculta después de 5 segundos
    }, []);

    return { isToasterOpen, isSuccess, messageToaster, showToaster };
};

/* 
Mensaje flotante a mostrar después de cada operación
*/
const Toaster: React.FC<ToasterProps> = ({ isOpen, isSuccess, statusMessage }) => {
    if (!isOpen) return null;

    return (
        <div className={`w-fit max-w-full fixed bottom-0 right-0 p-4 m-4 rounded-lg border
            ${isSuccess ? 'bg-green-300 border-green-600' : 'bg-red-300 border-red-600'}`}>
            {statusMessage}
        </div>
    )
};

export default Toaster;