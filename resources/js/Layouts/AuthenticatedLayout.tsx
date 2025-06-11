import ApplicationLogo from '@/Components/ApplicationLogo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BadgePlus,
    House,
    LogOut,
    ShoppingBasket,
    User,
} from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function AuthenticatedLayout({
    title,
    children,
}: PropsWithChildren<{ title?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const currentPage = usePage().url;
    const [showingMobileMenu, setShowingMobileMenu] = useState(false);
    return (
        <div className="bg-neutral-light text-neutral-dark min-h-screen dark:bg-yellow-secondary dark:text-white">
            <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-yellow-primary">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <Link href="/">
                            <div className={'flex gap-2'}>
                                <ApplicationLogo className="h-9 w-auto fill-current text-black" />
                                <div
                                    className={
                                        'content-center text-xl font-bold text-black'
                                    }
                                >
                                    {'Receptukas'}
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/*<div className="hidden items-center space-x-4 sm:flex">*/}
                    {/*    <NavLink*/}
                    {/*        href={route('home')}*/}
                    {/*        active={route().current('home')}*/}
                    {/*    >*/}
                    {/*        Home*/}
                    {/*    </NavLink>*/}
                    {/*    <NavLink*/}
                    {/*        href={route('carts.index')}*/}
                    {/*        active={route().current('dashboard')}*/}
                    {/*    >*/}
                    {/*        My carts*/}
                    {/*    </NavLink>*/}
                    {/*    <NavLink*/}
                    {/*        href={route('profile.edit')}*/}
                    {/*        active={route().current('profile.edit')}*/}
                    {/*    >*/}
                    {/*        Profile*/}
                    {/*    </NavLink>*/}
                    {/*    <button*/}
                    {/*        onClick={() => handleLogout()}*/}
                    {/*        className="rounded-lg bg-warm-red px-3 py-2 font-semibold text-white hover:bg-red-600"*/}
                    {/*    >*/}
                    {/*        Log Out*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <button
                        onClick={() => setShowingMobileMenu(!showingMobileMenu)}
                        className="focus:ring-primary-green rounded-lg p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            {!showingMobileMenu ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {showingMobileMenu && (
                <div className="border-t border-gray-200 bg-white sm:hidden dark:border-gray-600 dark:bg-gray-900">
                    <div className="space-y-1 px-4 py-2">
                        <ResponsiveNavLink
                            href={route('home')}
                            active={route().current('home')}
                        >
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('profile.edit')}
                            active={route().current('profile.edit')}
                        >
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('carts.index')}
                            active={route().current('cart.index')}
                        >
                            My carts
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            )}

            {currentPage !== '/home' && (
                <header className="bg-neutral-light shadow-md dark:bg-yellow-primary">
                    <div className="mx-auto flex max-w-7xl gap-4 px-2 py-2.5 sm:px-6 lg:px-8">
                        {window.history.length > 1 && (
                            <button onClick={() => window.history.back()}>
                                <ArrowLeft />
                            </button>
                        )}
                        {title}
                    </div>
                </header>
            )}

            <main className="mx-auto max-w-4xl px-6 py-6 pb-16 sm:px-12 lg:px-24">
                {children}
            </main>

            <nav className="bg-neutral-light fixed bottom-0 left-0 right-0 flex justify-center gap-10 py-2 shadow-md sm:gap-28 dark:bg-yellow-primary">
                <NavItem href={route('home')} icon={<House />} label="Home" />
                <NavItem
                    href={route('profile.edit')}
                    icon={<User />}
                    label="Profile"
                />
                <NavItem
                    href={route('recipe.create')}
                    icon={<BadgePlus />}
                    label="Create"
                />
                <NavItem
                    href={route('carts.index')}
                    icon={<ShoppingBasket />}
                    label="My carts"
                />
                <NavItem
                    href={route('logout')}
                    icon={<LogOut />}
                    label="Logout"
                    method="post"
                />
            </nav>
        </div>
    );
}

function NavItem({
    href,
    icon,
    label,
    method,
}: {
    href: string;
    icon: string;
    label: string;
    method?: string;
}) {
    return (
        <Link
            href={href}
            method={method}
            as="button"
            className="flex flex-col items-center space-y-1"
        >
            <span className="text-xl">{icon}</span>
            <span className="text-xs font-medium">{label}</span>
        </Link>
    );
}

function handleLogout() {
    // Trigger logout (you may replace this with actual form submission)
    document.querySelector(`form[action="${route('logout')}"]`)?.submit();
}
