import {PageProps} from '@/types';
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/react";

export default function Welcome({auth}: PageProps<{ auth: { user?: { name: string } } }>) {
    const isAuthenticated = !!auth.user;

    return (
        <Layout isAuthenticated={isAuthenticated}>
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary-green dark:bg-gray-800">
                    </h1>
                    <p className="text-neutral-dark dark:text-neutral-light mt-2">
                        Discover and enjoy delicious recipes tailored for you.
                    </p>
                </div>

                {!isAuthenticated && (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Get Started with Receptukas
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Log in or register to start saving your favorite recipes.
                        </p>
                        <div className="mt-4 space-y-4 max-w-xs mx-auto">
                            <ButtonLink href={route('login')} text="Log in"/>
                            <ButtonLink href={route('register')} text="Register"/>
                        </div>
                    </div>
                )}

                {isAuthenticated && (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Welcome Back, {auth.user?.name}!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Head over to your dashboard or explore new recipes.
                        </p>
                        <div className="mt-4 space-y-4 max-w-xs mx-auto">
                            <ButtonLink href={route('dashboard')} text="Go to Dashboard"/>
                            <ButtonLink href="#" text="Explore Recipes"/>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <DashboardCard title="Recipes Available" value="512" icon="🍲"/>
                    <DashboardCard title="Users on Platform" value="4,239" icon="👥"/>
                </div>

            </div>
        </Layout>
    );
}

function Layout({isAuthenticated, children}: { isAuthenticated: boolean; children: React.ReactNode }) {
    return isAuthenticated ? (
        <AuthenticatedLayout title="Welcome to Receptukas!">{children}</AuthenticatedLayout>
    ) : (
        <GuestLayout title="Welcome to Receptukas!">{children}</GuestLayout>
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

function ButtonLink({href, text}: { href: string; text: string }) {
    return (
        <Link
            href={href}
            className="block w-full bg-primary-green dark:bg-accent-yellow text-white dark:text-black text-center py-3 rounded-lg font-semibold shadow-md hover:bg-primary-green/90 dark:hover:bg-accent-yellow/80"
        >
            {text}
        </Link>
    );
}
