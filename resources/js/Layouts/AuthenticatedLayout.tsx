import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/react';
import {PropsWithChildren, ReactNode, useState} from 'react';

export default function AuthenticatedLayout({
                                                title,
                                                children,
                                            }: PropsWithChildren<{ title?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingMobileMenu, setShowingMobileMenu] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-white">
            <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="flex h-16 justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="h-9 w-auto fill-current text-primary-green"/>
                        </Link>
                    </div>

                    <div className="hidden sm:flex space-x-4 items-center">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </NavLink>
                        <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                            Profile
                        </NavLink>
                        <button
                            onClick={() => handleLogout()}
                            className="px-3 py-2 rounded-lg bg-warm-red text-white font-semibold hover:bg-red-600"
                        >
                            Log Out
                        </button>
                    </div>
                    <button
                        onClick={() => setShowingMobileMenu(!showingMobileMenu)}
                        className="sm:hidden p-2 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            {!showingMobileMenu ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {showingMobileMenu && (
                <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600">
                    <div className="space-y-1 px-4 py-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            )}

            {title && (
                <header className="bg-neutral-light dark:bg-gray-800 shadow-md">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">{title}</div>
                </header>
            )}

            <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>

            <nav
                className="fixed bottom-0 left-0 right-0 bg-neutral-light dark:bg-gray-800 shadow-md py-2 flex justify-around sm:hidden">
                <NavItem href={route('dashboard')} icon="🏠" label="Home"/>
                <NavItem href={route('profile.edit')} icon="👤" label="Profile"/>
                <NavItem href={route('logout')} icon="🚪" label="Logout" method="post"/>
            </nav>
        </div>
    );
}

function NavItem({href, icon, label, method}: { href: string; icon: string; label: string; method?: string }) {
    return (
        <Link href={href} method={method} as="button" className="flex flex-col items-center space-y-1">
            <span className="text-xl">{icon}</span>
            <span className="text-xs font-medium">{label}</span>
        </Link>
    );
}

function handleLogout() {
    // Trigger logout (you may replace this with actual form submission)
    document.querySelector(`form[action="${route('logout')}"]`)?.submit();
}
