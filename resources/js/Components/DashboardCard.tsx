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
            className="mx-auto flex min-h-[120px] w-full max-w-lg transform cursor-pointer items-center justify-between rounded-xl bg-white p-6 shadow-md transition-transform dark:border-gray-700 dark:bg-gray-800"
        >
            <div className="flex items-center gap-4">
                <span className="text-5xl text-blue-500">{icon}</span>
                <div>
                    <h4 className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {title}
                    </h4>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}
