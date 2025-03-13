import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function Welcome({
    auth,
}: PageProps<{ auth: { user?: { name: string } } }>) {
    const isAuthenticated = !!auth.user;

    return (
        <Layout isAuthenticated={isAuthenticated}>
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-primary-green dark:bg-gray-800"></h1>
                    <p className="mt-2 text-neutral-dark dark:text-neutral-light">
                        Discover and enjoy delicious recipes tailored for you.
                    </p>
                    <div></div>
                </div>

                {!isAuthenticated && (
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Get Started with Receptukas
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Log in or register to start saving your favorite
                            recipes.
                        </p>
                        <div className="mx-auto mt-4 max-w-xs space-y-4">
                            <ButtonLink href={route('login')} text="Log in" />
                            <ButtonLink
                                href={route('register')}
                                text="Register"
                            />
                        </div>
                    </div>
                )}

                {isAuthenticated && (
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"></div>
                )}

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <DashboardCard
                        title="Recipes Available"
                        value="0"
                        icon="🍲"
                    />
                    <DashboardCard
                        title="Users on Platform"
                        value="3"
                        icon="👥"
                    />
                </div>
            </div>
        </Layout>
    );
}

function Layout({
    isAuthenticated,
    children,
}: {
    isAuthenticated: boolean;
    children: React.ReactNode;
}) {
    return isAuthenticated ? (
        <AuthenticatedLayout title="Welcome to Receptukas!">
            {children}
        </AuthenticatedLayout>
    ) : (
        <GuestLayout title="Welcome to Receptukas!">{children}</GuestLayout>
    );
}

function DashboardCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: string;
    icon: string;
}) {
    return (
        <div className="flex items-center rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <span className="text-3xl">{icon}</span>
            <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {title}
                </h4>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}

function ButtonLink({ href, text }: { href: string; text: string }) {
    return (
        <Link
            href={href}
            className="block w-full rounded-lg bg-primary-green py-3 text-center font-semibold text-white shadow-md hover:bg-primary-green/90 dark:bg-accent-yellow dark:text-black dark:hover:bg-accent-yellow/80"
        >
            {text}
        </Link>
    );
}
