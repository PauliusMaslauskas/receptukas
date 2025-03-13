import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import ProductCard from '@/Components/ProductCard';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductsModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            axios.get(route('products.categories')).then((response) => {
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
                <ProductCard value={product.name}></ProductCard>
            ))}
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} show={isOpen}>
            <form className="space-y-4 p-6">
                <div>
                    <div className={'flex w-full'}>
                        <TextInput className={'w-full'}></TextInput>
                    </div>
                    {selectedCategory !== null && (
                        <div>
                            <button onClick={() => setSelectedCategory(null)}>
                                back
                            </button>
                        </div>
                    )}
                    {isLoading ? (
                        <div className={'py-12 text-center text-xl text-white'}>
                            Loading.....
                        </div>
                    ) : selectedCategory ? (
                        renderProducts(selectedCategory)
                    ) : (
                        renderCategories()
                    )}
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
                    <PrimaryButton
                        type="submit"
                        onClick={() => {
                            onClose();
                            setSelectedCategory(null);
                        }}
                    >
                        Add
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
