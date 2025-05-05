import { useEffect, useState } from 'react';

const ProductSelect = ({ onAddIngredient }) => {
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.length > 1) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `/products?search=${searchTerm}`,
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setProducts(data);
                    }
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        } else {
            setProducts([]);
        }
    }, [searchTerm]);

    const handleAddClick = () => {
        if (selectedIngredient && quantity) {
            const formattedIngredient = `${selectedIngredient}: ${quantity}`;

            onAddIngredient(formattedIngredient);

            setSelectedIngredient('');
            setQuantity('');
            setSearchTerm('');
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-col space-y-2">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for an ingredient..."
                        className="w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                    />
                    {isLoading && (
                        <div className="absolute right-3 top-2 text-gray-400">
                            Loading...
                        </div>
                    )}

                    {products.length > 0 && (
                        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 shadow-lg">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-700"
                                    onClick={() => {
                                        setSelectedIngredient(product.name);
                                        setSearchTerm(product.name);
                                        setProducts([]);
                                    }}
                                >
                                    {product.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity (e.g. '2 cups')"
                        className="flex-grow rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                    />
                    <button
                        type="button"
                        onClick={handleAddClick}
                        disabled={!selectedIngredient || !quantity}
                        className="rounded-md border border-gray-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductSelect;
