import ApplicationLogo from '@/Components/ApplicationLogo';
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
                <div className={'grid grid-rows-3'}>
                    <ApplicationLogo className="h-28 w-auto justify-self-center fill-current text-black" />
                    <div className="mx-auto w-full max-w-sm rounded-lg bg-white p-6 shadow dark:bg-yellow-primary">
                        <div className="mx-auto max-w-xs space-y-4 pt-4 text-xl text-white">
                            <ButtonLink href={route('login')} text="Log in" />
                            <ButtonLink
                                href={route('register')}
                                text="Register"
                            />
                        </div>
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
        <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow dark:bg-yellow-primary">
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
            className="hover:bg-primary-green/90 dark:bg-primary-gray block w-full rounded-lg bg-black py-3 text-center font-semibold text-white shadow-md dark:text-white"
        >
            {text}
        </Link>
    );
}
