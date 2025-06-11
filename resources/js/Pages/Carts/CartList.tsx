import DashboardCard from '@/Components/DashboardCard';
import CreateCartModal from '@/Components/Modals/CreateCartModal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

interface CartItem {
    id: number;
    name: string;
    items: { id: number; name: string }[];
}

interface CartListProps {
    carts: CartItem[];
}

export default function CartList({ carts }: CartListProps) {
    const [isCreateCartModalOpen, setCreateCartModalOpen] =
        React.useState(false);
    const handleRemove = (id: number) => {
        router.delete(route('cart.destroy', { cart_id: id }), {
            onSuccess: () => toast('Cart deleted'),
        });
    };
    const openCart = (id: number) => {
        router.get(route('cart.show', { id }));
    };

    return (
        <>
            <CreateCartModal
                isOpen={isCreateCartModalOpen}
                onClose={() => setCreateCartModalOpen(false)}
            ></CreateCartModal>
            <AuthenticatedLayout title="CartView">
                <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {carts.map((cart) => (
                        <DashboardCard
                            key={cart.id}
                            title={cart.name}
                            value={
                                <span className="mt-4 items-center rounded-[8px] bg-red-primary px-3 py-1 text-sm font-medium text-white">
                                    {cart.items.length} items
                                </span>
                            }
                            icon={''}
                            onClick={() => openCart(cart.id)}
                            action={
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(cart.id);
                                    }}
                                    className="etext-black roundeevd-full relativ e z-10 p-2 text-black"
                                >
                                    <Trash />
                                </button>
                            }
                        />
                    ))}
                </div>
                <div className="justify-self-end px-4 py-6 sm:px-6 lg:px-8">
                    <PrimaryButton onClick={() => setCreateCartModalOpen(true)}>
                        Create Cart
                    </PrimaryButton>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
