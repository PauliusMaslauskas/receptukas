import React from 'react';

interface DashboardCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    action?: React.ReactNode;
    onClick?: () => void; // Add an optional onClick prop
}

export default function DashboardCard({
    title,
    value,
    icon,
    action,
    onClick,
}: DashboardCardProps) {
    return (
        <div
            onClick={onClick}
            className="mx-auto flex min-h-[120px] w-full max-w-lg transform cursor-pointer items-center justify-between rounded-xl bg-white p-6 shadow-md transition-transform dark:border-gray-700 dark:bg-yellow-primary"
        >
            <div className="flex items-center gap-4">
                <span className="text-5xl">{icon}</span>
                <div>
                    <h4 className="pb-2 text-xl font-bold text-gray-700 dark:text-white">
                        {title}
                    </h4>
                    <p className="dark:text-balck text-md text-gray-900">
                        {value}
                    </p>
                </div>
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}
