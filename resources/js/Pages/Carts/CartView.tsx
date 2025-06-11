import ProductsModal from '@/Components/Modals/ProductsModal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { Plus, ShoppingCart, Trash } from 'lucide-react';
import { useState } from 'react';
import { Cart } from '../../../../types/Cart';

interface CartProps {
    cart: Cart;
}

export default function CartView({ cart }: CartProps) {
    const [isCreateCartModalOpen, setCreateCartModalOpen] = useState(false);
    const [removingItemId, setRemovingItemId] = useState<number | null>(null);

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
                    cart={cart}
                    isOpen={isCreateCartModalOpen}
                    onClose={() => setCreateCartModalOpen(false)}
                />

                <div className="mb-6 rounded-lg bg-yellow-primary p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {cart.name}
                            </h1>
                            <p className="mt-1 text-sm text-black">
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
                        <div className="items-center space-x-3">
                            <button
                                onClick={() => setCreateCartModalOpen(true)}
                                className="items-center space-x-2 rounded bg-black p-3"
                            >
                                <div className={'text-xl'}>
                                    <Plus />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {isEmpty ? (
                    <div className="py-12 text-center">
                        <div className="mb-4 justify-items-center text-6xl">
                            <ShoppingCart size={76} />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-white">
                            Your cart is empty
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Start adding some products to get started!
                        </p>
                        {/*<PrimaryButton*/}
                        {/*    onClick={() => setCreateCartModalOpen(true)}*/}
                        {/*    className="inline-flex items-center space-x-2"*/}
                        {/*>*/}
                        {/*    <span>🛍️</span>*/}
                        {/*    <span>Browse Products</span>*/}
                        {/*</PrimaryButton>*/}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.items.map((item, index) => (
                            <div
                                key={item.id || index}
                                className={`rounded-lg bg-yellow-primary shadow-sm transition-all duration-200 hover:shadow-md ${
                                    removingItemId === item.id
                                        ? 'scale-95 opacity-50'
                                        : ''
                                }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-1 items-center space-x-4">
                                            <div className="text-2xl text-gray-600"></div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-xl font-semibold text-white">
                                                    {item.product.name}
                                                </h3>
                                                <div className="mt-1 flex items-center space-x-3">
                                                    <span className="inline-flex items-center rounded-full bg-red-primary px-2.5 py-0.5 text-xs font-medium text-red-primary"></span>
                                                    {item.quantity && (
                                                        <span className="text-sm text-black">
                                                            Qty: {item.quantity}
                                                        </span>
                                                    )}
                                                    {item.product.price && (
                                                        <span className="text-sm font-medium text-black">
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
                                                className="0 inline-flex h-8 w-8 items-center justify-center rounded-full text-black transition-colors duration-200 hover:text-white"
                                                title="Remove item"
                                            >
                                                {removingItemId === item.id ? (
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
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
                    <div className="justify-self-end pt-6">
                        <PrimaryButton
                            onClick={() =>
                                router.post(route('cart.clear', cart.id))
                            }
                        >
                            Clear Cart
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
