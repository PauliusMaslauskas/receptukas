import DashboardCard from '@/Components/DashboardCard';
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
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <a href={'/cart'}>
                        <DashboardCard title="" value="My Carts" icon="🛒" />
                    </a>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Recent Activity
                    </h3>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-center">
                            <span className="text-xl text-primary-green">
                                🍽️
                            </span>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">
                                You added <strong>Spaghetti Carbonara</strong>{' '}
                                to your recipe collection.
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-xl text-primary-green">
                                🔥
                            </span>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">
                                You saved <strong>Grilled Chicken</strong> to
                                your favorites.
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-xl text-primary-green">
                                ✅
                            </span>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">
                                You completed <strong>5 recipes</strong> this
                                week!
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
