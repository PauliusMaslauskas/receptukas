import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({
    children,
    title,
}: PropsWithChildren<{
    title: string;
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-black">
            <Head title={title} />
            <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
                <h1 className="text-lg font-semibold">{title}</h1>
            </header>
            <main className="flex-grow content-center dark:bg-gray-900">
                {children}
            </main>
            <footer className="bg-gray-900 p-4 text-center text-white">
                <p>
                    &copy; {new Date().getFullYear()} Receptukas. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
