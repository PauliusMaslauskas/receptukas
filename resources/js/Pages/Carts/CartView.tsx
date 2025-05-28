import ProductsModal from '@/Components/Modals/ProductsModal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import React from 'react';
import { Cart } from '../../../../types/Cart';

interface CartProps {
    cart: Cart;
}

export default function CartView({ cart }: CartProps) {
    const [isCreateCartModalOpen, setCreateCartModalOpen] =
        React.useState(false);
    const [removingItemId, setRemovingItemId] = React.useState<number | null>(
        null,
    );

    const handleRemoveItem = async (id: number) => {
        setRemovingItemId(id);
        try {
            router.delete(
                route('cart.removeCartItem', {
                    cart_id: cart.id,
                    cart_item_id: id,
                }),
                {
                    onFinish: () => setRemovingItemId(null),
                    onError: () => setRemovingItemId(null),
                },
            );
        } catch (error) {
            setRemovingItemId(null);
        }
    };

    const getTotalItems = () => {
        return (
            cart.items?.reduce(
                (total, item) => total + (item.quantity || 1),
                0,
            ) || 0
        );
    };

    const getTotalValue = () => {
        return (
            cart.items?.reduce(
                (total, item) =>
                    total + (item.product.price / 100) * item.quantity,
                0,
            ) || 0
        );
    };

    const isEmpty = !cart.items || cart.items.length === 0;

    return (
        <AuthenticatedLayout title={cart.name}>
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <ProductsModal
                    isOpen={isCreateCartModalOpen}
                    onClose={() => setCreateCartModalOpen(false)}
                />

                <div className="mb-6 rounded-lg border bg-gray-800 p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {cart.name}
                            </h1>
                            <p className="mt-1 text-sm text-white">
                                {getTotalItems()}{' '}
                                {getTotalItems() === 1 ? 'item' : 'items'}
                                {cart.items?.some(
                                    (item) => item.product.price,
                                ) && (
                                    <span className="ml-2">
                                        • Total: {getTotalValue().toFixed(2)} €
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <PrimaryButton
                                onClick={() => setCreateCartModalOpen(true)}
                                className="flex items-center space-x-2"
                            >
                                <span>➕</span>
                                <span>Add Products</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                {isEmpty ? (
                    <div className="py-12 text-center">
                        <div className="mb-4 text-6xl">🛒</div>
                        <h3 className="mb-2 text-lg font-medium text-white">
                            Your cart is empty
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Start adding some products to get started!
                        </p>
                        <PrimaryButton
                            onClick={() => setCreateCartModalOpen(true)}
                            className="inline-flex items-center space-x-2"
                        >
                            <span>🛍️</span>
                            <span>Browse Products</span>
                        </PrimaryButton>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.items.map((item, index) => (
                            <div
                                key={item.id || index}
                                className={`rounded-lg bg-gray-800 shadow-sm transition-all duration-200 hover:shadow-md ${
                                    removingItemId === item.id
                                        ? 'scale-95 opacity-50'
                                        : ''
                                }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-1 items-center space-x-4">
                                            <div className="text-2xl">
                                                {item.product.image || ''}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-lg font-semibold text-white">
                                                    {item.product.name}
                                                </h3>
                                                <div className="mt-1 flex items-center space-x-3">
                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                        {item.category}
                                                    </span>
                                                    {item.quantity && (
                                                        <span className="text-sm text-white">
                                                            Qty: {item.quantity}
                                                        </span>
                                                    )}
                                                    {item.product.price && (
                                                        <span className="text-sm font-medium text-white">
                                                            {(
                                                                (item.product
                                                                    .price /
                                                                    100) *
                                                                (item.quantity ||
                                                                    1)
                                                            ).toFixed(2)}{' '}
                                                            €
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex items-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleRemoveItem(item.id)
                                                }
                                                disabled={
                                                    removingItemId === item.id
                                                }
                                                className="0 inline-flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors duration-200 hover:text-white"
                                                title="Remove item"
                                            >
                                                {removingItemId === item.id ? (
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                                ) : (
                                                    <span className="text-lg">
                                                        <Trash />
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isEmpty && (
                    <div className="mt-8 rounded-lg border bg-gray-800 p-6 shadow-sm">
                        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <div className="text-sm text-gray-600">
                                {getTotalItems()}{' '}
                                {getTotalItems() === 1 ? 'item' : 'items'} in
                                cart
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() =>
                                        router.post(
                                            route('cart.clear', cart.id),
                                        )
                                    }
                                    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
