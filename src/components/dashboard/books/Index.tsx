import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { isAxiosError } from "axios";
import RegisterBook from "./RegisterBook";
import Toaster, { useToaster } from "../../utils/Toaster";

export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    release_date: string;
    registered_by_name: string;
}

const DashboardBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    /* Usa el hook useToaster */
    const { isToasterOpen, isSuccess, messageToaster, showToaster } = useToaster();

    /* Obtiene los libros */
    const fetchBooks = async () => {
        try {
            const response = await axiosInstance.get("/books");
            setBooks(response.data);
        } catch (err) {
            if (isAxiosError(err) && err.status === 401) {
                window.location.href = "/";
            } else {
                showToaster(false, "Error al cargar los libros");
            }
        } finally {
            setIsLoading(false);
        }
    };

    /* Envía la solicitud para eliminar un libro */
    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/books/${bookId}`);
            showToaster(true, "Libro eliminado correctamente");
            fetchBooks(); // Actualiza la lista de libros después de eliminar
        } catch (err) {
            showToaster(false, "Error al eliminar el libro");
        }
    };

    /* Cierra el modal, muestra el mensaje y obtiene los usuarios */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (!editingBook) {
            showToaster(true, "Libro creado correctamente");
        } else {
            showToaster(true, "Libro editado correctamente");
        }
        setEditingBook(null); // Reinicia usuario en edición
        fetchBooks();
    };

    /* Obtiene los libros al cargar el componente */
    useEffect(() => {
        fetchBooks();
    }, []);

    /* Mientras son cargados los libros, muestra un loader */
    if (isLoading === null) {
        return <div>Cargando libros...</div>;
    }

    return (
        <section className="w-full flex flex-col gap-8">
            {/* Encabezado principal; Título y Botón para agregar nuevo libro */}
            <div className="w-full flex justify-between">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">Libros</h1>
                <button onClick={() => setIsModalOpen(true)}>Nuevo libro</button>
            </div>

            {/* Tabla de libros */}
            <table className="w-full">
                {/* Encabezado */}
                <thead className="bg-gray-300 text-black">
                    <tr>
                        <th className="px-4 py-2 text-center rounded-tl-lg">ID</th>
                        <th className="px-4 py-2 text-center">Título</th>
                        <th className="px-4 py-2 text-center">Autor</th>
                        <th className="px-4 py-2 text-center">ISBN</th>
                        <th className="px-4 py-2 text-center">Fecha de lanzamiento</th>
                        <th className="px-4 py-2 text-center">Registrado por</th>
                        <th className="px-4 py-2 text-center rounded-tr-lg">Acciones</th>
                    </tr>
                </thead>
                {/* Contenido */}
                <tbody>
                    {books && books.length > 0 ? (
                        books.map((book, index) => (
                            <tr
                                key={book.id}
                                className={`text-black text-center border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}`}
                            >
                                <td className="px-4 py-2">{book.id}</td>
                                <td className="px-4 py-2">{book.title}</td>
                                <td className="px-4 py-2">{book.author}</td>
                                <td className="px-4 py-2">{book.isbn}</td>
                                <td className="px-4 py-2">{book.release_date}</td>
                                <td className="px-4 py-2">{book.registered_by_name}</td>
                                <td className="px-4 py-2 flex flex-col md:flex-row gap-2 justify-center">
                                    <button onClick={() => {
                                        setEditingBook(book);
                                        setIsModalOpen(true);
                                    }}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(book.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="border px-4 py-2 text-center">
                                No hay libros por mostrar
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal de Registro y Edición de libros */}
            <RegisterBook
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                editingBook={editingBook}
            />

            {/* Mensaje flotante */}
            <Toaster isOpen={isToasterOpen} isSuccess={isSuccess} statusMessage={messageToaster} />
        </section>
    );
};

export default DashboardBooks;