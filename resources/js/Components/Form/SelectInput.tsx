import { ComponentProps } from 'react';

interface SelectInputProps extends ComponentProps<'select'> {
    error?: string;
    options: { value: string; label: string }[];
}

export default function SelectInput({
    name,
    error,
    className,
    options = [],
    ...props
}: SelectInputProps) {
    return (
        <div className="relative">
            <select
                id={name}
                name={name}
                {...props}
                className={`form-select z-50 mt-1 w-full border-gray-600 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
                    error
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                        : ''
                } ${className}`}
                style={{ position: 'relative', zIndex: 9999 }}
            >
                {options?.map(({ value, label }, index) => (
                    <option key={index} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
}
