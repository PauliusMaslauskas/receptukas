import Modal from '@/Components/Modal';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CreateCartModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [name, setName] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('cart.store'), { name }, {});
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} show={isOpen}>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
                <h2 className="text-lg font-bold text-gray-800">
                    Create New Cart
                </h2>

                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-600"
                    >
                        Cart Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <PrimaryButton type="submit" onClick={onClose}>
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
