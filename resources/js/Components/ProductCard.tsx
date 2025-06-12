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
            className="flex min-w-[106px] max-w-lg transform cursor-pointer justify-center rounded-xl bg-white p-2 shadow-md transition-transform dark:bg-black"
        >
            <div className="flex items-center gap-4">
                <div>
                    <p className="text-center text-[15px] font-bold text-white dark:text-white">
                        {value}
                    </p>
                </div>
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}
