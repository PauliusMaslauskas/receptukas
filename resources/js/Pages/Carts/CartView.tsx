import DashboardCard from '@/Components/DashboardCard';
import ProductsModal from '@/Components/Modals/ProductsModal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import React from 'react';
import { Cart } from '../../../../types/Cart';

interface CartProps {
    cart: Cart;
}

export default function CartView({ cart }: CartProps) {
    const [isCreateCartModalOpen, setCreateCartModalOpen] =
        React.useState(false);

    const handleRemoveItem = (id: number) => {
        router.delete(
            route('cart.removeCartItem', {
                cart_id: cart.id,
                cart_item_id: id,
            }),
        );
    };

    return (
        <AuthenticatedLayout title={cart.name}>
            <ProductsModal
                isOpen={isCreateCartModalOpen}
                onClose={() => setCreateCartModalOpen(false)}
            />
            {cart.items.map((item) => (
                <DashboardCard
                    icon={'🛍️'}
                    value={item.category}
                    title={item.name}
                ></DashboardCard>
            ))}
            <PrimaryButton
                className={'mt-4'}
                onClick={() => setCreateCartModalOpen(true)}
            >
                Add Products
            </PrimaryButton>
        </AuthenticatedLayout>
    );
}
