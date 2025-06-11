import TextInput from '@/Components/Form/TextInput';
import Modal from '@/Components/Modal';
import ProductCard from '@/Components/ProductCard';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Cart } from '../../../../types/Cart';

export default function ProductsModal({
    isOpen,
    onClose,
    cart,
}: {
    isOpen: boolean;
    onClose: () => void;
    cart: Cart;
}) {
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    let filerProducts = [];

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            axios.get(route('product.categories')).then((response) => {
                setCategories(response.data);
                setLoading(false);
            });
        }
    }, [isOpen]);

    const renderCategories = () => (
        <div className={'gap 2 grid grid-cols-3 gap-4 py-12'}>
            {categories.map((category) => (
                <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                >
                    <ProductCard value={category.name} />
                </div>
            ))}
        </div>
    );

    const renderProducts = (category) => (
        <div className={'gap 2 grid grid-cols-3 gap-4 py-12'}>
            {category.products.map((product) => (
                <div
                    key={product.id}
                    onClick={() => {
                        router.post(route('cart.addItem'), {
                            cart_id: cart.id,
                            product_id: product.id,
                        });
                        setSelectedCategory(null);
                        onClose();
                    }}
                >
                    <ProductCard value={product.name}></ProductCard>
                </div>
            ))}
        </div>
    );

    if (searchValue != '') {
        filerProducts = categories.flatMap((category) =>
            category.products.filter((product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase()),
            ),
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} show={isOpen}>
            <form className="space-y-4 p-6">
                {selectedCategory !== null && (
                    <div>
                        <button
                            className={'text-white'}
                            onClick={() => setSelectedCategory(null)}
                        >
                            <ArrowLeft />
                        </button>
                    </div>
                )}
                <div>
                    <div className={'flex w-full'}>
                        <TextInput
                            placeholder={'Search products...'}
                            className={'w-full'}
                            onChange={(e) => setSearchValue(e.target.value)}
                        ></TextInput>
                    </div>

                    <div>
                        {isLoading ? (
                            <div
                                className={
                                    'py-12 text-center text-xl text-white'
                                }
                            >
                                Loading.....
                            </div>
                        ) : searchValue != '' ? (
                            <div
                                className={'gap 2 grid grid-cols-3 gap-4 py-12'}
                            >
                                {filerProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        onClick={() => {
                                            router.post(route('cart.addItem'), {
                                                cart_id: cart.id,
                                                product_id: product.id,
                                            });
                                            setSelectedCategory(null);
                                            setSearchValue('');
                                            onClose();
                                        }}
                                        value={product.name}
                                    ></ProductCard>
                                ))}
                            </div>
                        ) : selectedCategory ? (
                            renderProducts(selectedCategory)
                        ) : (
                            renderCategories()
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            setSelectedCategory(null);
                        }}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}
