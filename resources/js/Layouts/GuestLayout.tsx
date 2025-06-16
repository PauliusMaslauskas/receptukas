import { PropsWithChildren } from 'react';

export default function Guest({
    children,
    title,
}: PropsWithChildren<{
    title: string;
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-black">
            <header className="flex items-center justify-between bg-yellow-primary p-4 text-white"></header>
            <main className="flex-grow content-center dark:bg-yellow-secondary">
                {children}
            </main>
            <footer className="bg-yellow-primary p-4 text-sm text-black">
                <p>
                    &copy; {new Date().getFullYear()} Receptukas. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
