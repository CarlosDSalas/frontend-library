import FormField from "../../login/FormField";
import { useEffect, useState } from "react";
import { Book } from "./Index";
import axiosInstance from "../../../api/axiosInstance";
import { isAxiosError } from "axios";
import Toaster, { useToaster } from "../../utils/Toaster";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingBook?: Book | null;
}

const RegisterBook: React.FC<RegisterModalProps> = ({ isOpen, onClose, editingBook }) => {
    const [title, setTitle] = useState(editingBook?.title || "");
    const [author, setAuthor] = useState(editingBook?.author || "");
    const [isbn, setIsbn] = useState(editingBook?.isbn || "");
    const [release_date, setReleaseDate] = useState(editingBook?.release_date || "");

    /* Usa el hook useToaster */
    const { isToasterOpen, isSuccess, messageToaster, showToaster } = useToaster();

    /* Restaura los valores cuando se esté editando o registrando un libro */
    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setIsbn(editingBook.isbn);
            setReleaseDate(editingBook.release_date);
        } else {
            setTitle("");
            setAuthor("");
            setIsbn("");
            setReleaseDate("");
        }
    }, [editingBook]);

    /* Envía la solicitud para editar o registrar un libro */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingBook) { /* Edita un libro */
                await axiosInstance.patch(`/books/${editingBook.id}`, { title, author, isbn, release_date });
            } else { /* Crea un libro */
                await axiosInstance.post("/books", { title, author, isbn, release_date });
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
                    {editingBook ? "Editar Libro" : "Registrar Libro"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        type="text"
                        label="Título"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <FormField
                        type="text"
                        label="Autor"
                        placeholder="Autor"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    <FormField
                        type="text"
                        label="ISBN"
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />

                    <FormField
                        type="date"
                        label="Fecha de lanzamiento"
                        placeholder="Fecha de lanzamiento"
                        value={release_date}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />

                    <button type="submit">
                        {editingBook ? "Guardar cambios" : "Registrar"}
                    </button>
                </form>
            </div>

            {/* Mensaje flotante */}
            <Toaster isOpen={isToasterOpen} isSuccess={isSuccess} statusMessage={messageToaster} />
        </div>
    );
};

export default RegisterBook;