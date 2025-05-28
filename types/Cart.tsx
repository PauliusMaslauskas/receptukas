export interface Cart {
    id: number;
    name: string;
    items: CartItem[];
    created_at?: string;
    updated_at?: string;
}

export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    category: string;
    price: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    price: number;
}
