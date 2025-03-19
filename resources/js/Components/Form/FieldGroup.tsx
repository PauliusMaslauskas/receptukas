interface FieldGroupProps {
    name?: string;
    label?: string;
    error?: string;
    children: React.ReactNode;
}

export default function FieldGroup({
    label,
    name,
    error,
    children,
}: FieldGroupProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label
                    className="block select-none text-gray-800"
                    htmlFor={name}
                >
                    {label}:
                </label>
            )}
            {children}
            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        </div>
    );
}
