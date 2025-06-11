import RecipeCard from '@/Components/RecipeCard';
import SearchSection from '@/Components/SearchSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { CookingPot, Users } from 'lucide-react';
import React from 'react';

export default function Welcome({
    auth,
    recipes,
    usersCount,
}: PageProps<{
    auth: { user?: { name: string } };
    recipes: [];
    usersCount: number;
}>) {
    const isAuthenticated = !!auth.user;

    return (
        <Layout isAuthenticated={isAuthenticated}>
            {!isAuthenticated && (
                <div className="dark:bg-yellow-primary mx-auto w-full max-w-sm rounded-lg bg-white p-6 shadow">
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Log in or register to start saving your favorite
                        recipes.
                    </p>
                    <div className="mx-auto mt-4 max-w-xs space-y-4 pt-4">
                        <ButtonLink href={route('login')} text="Log in" />
                        <ButtonLink href={route('register')} text="Register" />
                    </div>
                </div>
            )}

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                {isAuthenticated && (
                    <>
                        <SearchSection />
                        <div className="mb-6 flex gap-4">
                            <DashboardCard
                                title=""
                                value={recipes.length}
                                icon={<CookingPot size={28} />}
                            />
                            <DashboardCard
                                title=""
                                value={usersCount}
                                icon={<Users size={28} />}
                            />
                        </div>

                        {recipes &&
                            recipes.map((recipe, index) => (
                                <a href={''}>
                                    <RecipeCard recipe={recipe} />
                                </a>
                            ))}
                    </>
                )}
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
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
    ) : (
        <GuestLayout>{children}</GuestLayout>
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
        <div className="dark:bg-yellow-primary flex items-center gap-2 rounded-lg bg-white p-4 shadow">
            <span className="text-xl text-white">{icon}</span>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {value}
            </p>
            <h4 className="text-md font-medium text-gray-700 dark:text-white">
                {title}
            </h4>
        </div>
    );
}

function ButtonLink({ href, text }: { href: string; text: string }) {
    return (
        <Link
            href={href}
            className="block w-full rounded-lg py-3 text-center font-semibold text-white shadow-md hover:bg-primary-green/90 dark:bg-primary-gray dark:text-black dark:hover:bg-white"
        >
            {text}
        </Link>
    );
}
