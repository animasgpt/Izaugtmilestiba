// Demo pasūtījumu datu bāze
// Reālā aplikācijā šie dati būtu datubāzē

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: 'stripe' | 'bank_transfer';
    paymentStatus: 'pending' | 'paid' | 'failed';
    shippingAddress: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    dpdLocation?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

let orders: Order[] = [
    {
        id: '1',
        orderNumber: 'IM-2026-001',
        customerName: 'Anna Bērziņa',
        customerEmail: 'anna.berzina@gmail.com',
        customerPhone: '+371 20123456',
        items: [
            {
                productId: '1',
                productName: 'Grāmata "Izaugt Mīlestībā"',
                quantity: 1,
                price: 24.99,
            },
        ],
        subtotal: 24.99,
        shipping: 3.50,
        total: 28.49,
        status: 'processing',
        paymentMethod: 'stripe',
        paymentStatus: 'paid',
        shippingAddress: {
            street: 'Brīvības iela 123',
            city: 'Rīga',
            postalCode: 'LV-1001',
            country: 'Latvija',
        },
        dpdLocation: 'DPD Pakomāts - Rīga, Brīvības iela 45',
        createdAt: '2026-01-13T14:30:00Z',
        updatedAt: '2026-01-13T14:30:00Z',
    },
    {
        id: '2',
        orderNumber: 'IM-2026-002',
        customerName: 'Māris Kalniņš',
        customerEmail: 'maris.kalnins@inbox.lv',
        customerPhone: '+371 26789012',
        items: [
            {
                productId: '2',
                productName: 'Individuāla konsultācija (60 min)',
                quantity: 1,
                price: 45.00,
            },
        ],
        subtotal: 45.00,
        shipping: 0,
        total: 45.00,
        status: 'pending',
        paymentMethod: 'bank_transfer',
        paymentStatus: 'pending',
        shippingAddress: {
            street: 'Elizabetes iela 67',
            city: 'Rīga',
            postalCode: 'LV-1050',
            country: 'Latvija',
        },
        notes: 'Lūdzu zvanīt pirms konsultācijas',
        createdAt: '2026-01-14T09:15:00Z',
        updatedAt: '2026-01-14T09:15:00Z',
    },
    {
        id: '3',
        orderNumber: 'IM-2026-003',
        customerName: 'Laura Ozoliņa',
        customerEmail: 'laura.ozolina@gmail.com',
        customerPhone: '+371 29345678',
        items: [
            {
                productId: '1',
                productName: 'Grāmata "Izaugt Mīlestībā"',
                quantity: 2,
                price: 24.99,
            },
            {
                productId: '3',
                productName: '30 dienu izaicinājums',
                quantity: 1,
                price: 39.99,
            },
        ],
        subtotal: 89.97,
        shipping: 3.50,
        total: 93.47,
        status: 'delivered',
        paymentMethod: 'stripe',
        paymentStatus: 'paid',
        shippingAddress: {
            street: 'Krišjāņa Barona iela 89',
            city: 'Rīga',
            postalCode: 'LV-1011',
            country: 'Latvija',
        },
        dpdLocation: 'DPD Pakomāts - Rīga, Barona iela 12',
        createdAt: '2026-01-10T11:20:00Z',
        updatedAt: '2026-01-12T16:45:00Z',
    },
];

export function getAllOrders(): Order[] {
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(id: string): Order | undefined {
    return orders.find(o => o.id === id);
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
    return orders.find(o => o.orderNumber === orderNumber);
}

export function createOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const year = new Date().getFullYear();
    const orderCount = orders.length + 1;
    const orderNumber = `IM-${year}-${String(orderCount).padStart(3, '0')}`;

    const newOrder: Order = {
        ...order,
        id: Date.now().toString(),
        orderNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    return newOrder;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;

    orders[index] = {
        ...orders[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    return orders[index];
}

export function updateOrderStatus(
    id: string,
    status: Order['status']
): Order | null {
    return updateOrder(id, { status });
}

export function updatePaymentStatus(
    id: string,
    paymentStatus: Order['paymentStatus']
): Order | null {
    return updateOrder(id, { paymentStatus });
}

export function deleteOrder(id: string): boolean {
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return false;

    orders.splice(index, 1);
    return true;
}

export function getOrderStats() {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const cancelled = orders.filter(o => o.status === 'cancelled').length;

    const totalRevenue = orders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, order) => sum + order.total, 0);

    const thisMonthRevenue = orders
        .filter(o => {
            const orderDate = new Date(o.createdAt);
            const now = new Date();
            return (
                o.paymentStatus === 'paid' &&
                orderDate.getMonth() === now.getMonth() &&
                orderDate.getFullYear() === now.getFullYear()
            );
        })
        .reduce((sum, order) => sum + order.total, 0);

    return {
        total,
        pending,
        processing,
        shipped,
        delivered,
        cancelled,
        totalRevenue,
        thisMonthRevenue,
    };
}
