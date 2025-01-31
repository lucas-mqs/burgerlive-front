export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    options?: {
        type?: 'single' | 'combo';
    };
}