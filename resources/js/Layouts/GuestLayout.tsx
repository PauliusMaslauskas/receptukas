import {Head} from '@inertiajs/react';
import {PropsWithChildren} from 'react';

export default function Guest({
                                  children,
                                  title
                              }: PropsWithChildren<{
    title: string
}>) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
            <Head title={title}/>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-lg font-semibold">{title}</h1>
            </header>
            <main className="flex-grow dark:bg-gray-900">{children}</main>
            <footer className="bg-gray-900 text-white p-4 text-center">
                <p>&copy; {new Date().getFullYear()} Receptukas. All rights reserved.</p>
            </footer>
        </div>
    );
}
