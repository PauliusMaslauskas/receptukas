import DashboardCard from '@/Components/DashboardCard';
import CreateCartModal from '@/Components/Modals/CreateCartModal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import React from 'react';

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
        router.delete(route('cart.destroy', { cart_id: id }));
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
                            value={`${cart.items.length} items`}
                            icon={<span className="text-4xl">🛒</span>}
                            onClick={() => openCart(cart.id)}
                            action={
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(cart.id);
                                    }}
                                    className="relative z-10 rounded-full p-2 hover:bg-red-100"
                                >
                                    <Trash2 size={20} color="red" />
                                </button>
                            }
                        />
                    ))}
                </div>
                <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <PrimaryButton
                        className="mt-4"
                        onClick={() => setCreateCartModalOpen(true)}
                    >
                        Create Cart
                    </PrimaryButton>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
