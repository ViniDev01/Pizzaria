export interface User{
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    createdAt: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    token: string;
    role: "ADMIN" | "STAFF";
}

export interface Category {
    id: string;
    name: string;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
    disabled: boolean;
    category_id: string;
    createdAt: string;
    category: {
        id: string;
        name: string;
    };
}

export interface Items{
    id: string;
    amount: number;
    createdAt: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        banner: string;
    }
}

export interface Order{
    id: string;
    table: string;
    status: boolean;
    draft: boolean;
    name: string;
    createdAt: string;
    items: Items[];
}
