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
                <div className="mx-auto w-full max-w-sm rounded-lg bg-white p-6 shadow dark:bg-gray-800">
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
                        <div className={'pb-4 text-2xl font-bold'}>
                            {recipes.length}
                            {' Recipes'}
                        </div>

                        {recipes &&
                            recipes.map((recipe, index) => (
                                <a href={''}>
                                    <RecipeCard recipe={recipe} />
                                </a>
                            ))}
                    </>
                )}

                <div className="mx-auto mt-6 grid w-full max-w-sm grid-cols-1 gap-4">
                    <DashboardCard
                        title="Recipes Available"
                        value={recipes.length}
                        icon={<CookingPot size={32} />}
                    />
                    <DashboardCard
                        title="Users on Platform"
                        value={usersCount}
                        icon={<Users size={32} />}
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
        <div className="flex items-center rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <span className="text-3xl text-white">{icon}</span>
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
            className="dark:bg-primary-gray block w-full rounded-lg py-3 text-center font-semibold text-white shadow-md hover:bg-primary-green/90 dark:text-black dark:hover:bg-white"
        >
            {text}
        </Link>
    );
}
