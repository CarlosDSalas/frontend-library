interface FormFieldProps {
    type: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ type, label, placeholder, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={type}
                className="text-gray-600 self-start">
                {label}
            </label>
            <input
                type={type}
                id={type}
                name={type}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-600"
                placeholder={placeholder}
                value={value}
                onChange={onChange} // Se agrega el manejador de cambio
                required
            />
        </div>
    );
};

export default FormField;