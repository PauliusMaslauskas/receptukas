import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            title="Dashboard"
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
                    Welcome to your Dashboard!
                </h2>
            }
        >
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <DashboardCard title="Total Recipes" value="152" icon="🍲"/>
                    <DashboardCard title="Saved Favorites" value="43" icon="❤️"/>
                    <DashboardCard title="Profile Views" value="1,230" icon="👀"/>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Recent Activity</h3>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-center">
                            <span className="text-primary-green text-xl">🍽️</span>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">
                                You added <strong>Spaghetti Carbonara</strong> to your recipe collection.
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-primary-green text-xl">🔥</span>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">
                                You saved <strong>Grilled Chicken</strong> to your favorites.
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-primary-green text-xl">✅</span>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">
                                You completed <strong>5 recipes</strong> this week!
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DashboardCard({title, value, icon}: { title: string; value: string; icon: string }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center">
            <span className="text-3xl">{icon}</span>
            <div className="ml-4">
                <h4 className="text-gray-700 dark:text-gray-200 text-sm font-medium">{title}</h4>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}
