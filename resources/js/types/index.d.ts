export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Recipe {
    id: number;
    author: string;
    name: string;
    description: string;
    ingredient_groups: string;
    instructions: string;
    img_path: string;
    tags: [];
    calories: number;
    time_to_complete: number;
    prep_time: number;
    image_path: string;
}

export interface Product {
    id: number;
    name: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
