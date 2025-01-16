interface FormFieldProps {
    type: string;
    label: string;
    placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({ type, label, placeholder }) => {
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
                required
            />
        </div>
    );
};

export default FormField;