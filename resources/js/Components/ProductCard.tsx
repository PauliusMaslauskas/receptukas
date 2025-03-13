import React from 'react';

interface ProductCardProps {
    value: string;
    action?: React.ReactNode;
    onClick?: () => void;
}

export default function ProductCard({
    value,
    action,
    onClick,
}: ProductCardProps) {
    return (
        <div
            onClick={onClick}
            className="flex max-w-lg transform cursor-pointer justify-center rounded-xl bg-white p-4 shadow-md transition-transform dark:border-gray-500 dark:bg-gray-700"
        >
            <div className="flex items-center gap-4">
                <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}
