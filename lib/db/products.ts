// Demo produktu datu bāze
// Reālā aplikācijā šie dati būtu datubāzē

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'book' | 'consultation' | 'program';
    inStock: boolean;
    featured: boolean;
}

let products: Product[] = [
    {
        id: '1',
        name: 'Grāmata "Izaugt Mīlestībā"',
        description: 'Praktisks ceļvedis vecākiem par mīlestības pilnu audzināšanu',
        price: 24.99,
        image: '/images/book.jpg',
        category: 'book',
        inStock: true,
        featured: true,
    },
    {
        id: '2',
        name: 'Individuāla konsultācija (60 min)',
        description: 'Personiska tikšanās ar vecāku konsultanti',
        price: 45.00,
        image: '/images/consultation.jpg',
        category: 'consultation',
        inStock: true,
        featured: true,
    },
    {
        id: '3',
        name: '30 dienu izaicinājums',
        description: 'Strukturēta programma vecākiem ar ikdienas uzdevumiem',
        price: 39.99,
        image: '/images/challenge.jpg',
        category: 'program',
        inStock: true,
        featured: false,
    },
];

export function getAllProducts(): Product[] {
    return products;
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function createProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
    };
    products.push(newProduct);
    return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    return products[index];
}

export function deleteProduct(id: string): boolean {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
}
