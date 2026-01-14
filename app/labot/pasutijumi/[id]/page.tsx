'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
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

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrder();
    }, [params.id]);

    const fetchOrder = async () => {
        try {
            const response = await fetch(`/api/orders/${params.id}`);
            if (!response.ok) throw new Error('Pasūtījums nav atrasts');
            const data = await response.json();
            setOrder(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus: Order['status']) => {
        if (!order) return;

        try {
            const response = await fetch(`/api/orders/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'updateStatus', status: newStatus }),
            });

            if (response.ok) {
                const updated = await response.json();
                setOrder(updated);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('lv-LV', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700',
            processing: 'bg-blue-100 text-blue-700',
            shipped: 'bg-purple-100 text-purple-700',
            delivered: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Ielādē pasūtījumu...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <p className="text-red-800">{error || 'Pasūtījums nav atrasts'}</p>
                        <Link href="/labot/pasutijumi" className="text-red-600 hover:text-red-700 mt-4 inline-block">
                            ← Atpakaļ uz pasūtījumiem
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/labot/pasutijumi"
                        className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
                    >
                        ← Atpakaļ uz pasūtījumiem
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Pasūtījums {order.orderNumber}</h1>
                            <p className="text-gray-600 mt-2">Izveidots: {formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status === 'pending' && 'Gaida'}
                            {order.status === 'processing' && 'Apstrādē'}
                            {order.status === 'shipped' && 'Nosūtīts'}
                            {order.status === 'delivered' && 'Piegādāts'}
                            {order.status === 'cancelled' && 'Atcelts'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Products */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Produkti</h2>
                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.productName}</p>
                                            <p className="text-sm text-gray-500">Daudzums: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Starpsumma:</span>
                                    <span className="text-gray-900">€{order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Piegāde:</span>
                                    <span className="text-gray-900">€{order.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                                    <span>Kopā:</span>
                                    <span className="text-primary-600">€{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Piegādes Adrese</h2>
                            <div className="text-gray-700">
                                <p>{order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                                {order.dpdLocation && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-sm font-medium text-gray-900">DPD Pakomāts:</p>
                                        <p className="text-sm text-gray-600">{order.dpdLocation}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Piezīmes</h2>
                                <p className="text-gray-700">{order.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Klients</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Vārds</p>
                                    <p className="font-medium text-gray-900">{order.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">E-pasts</p>
                                    <p className="font-medium text-gray-900">{order.customerEmail}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Telefons</p>
                                    <p className="font-medium text-gray-900">{order.customerPhone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Maksājums</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Metode</p>
                                    <p className="font-medium text-gray-900">
                                        {order.paymentMethod === 'stripe' ? 'Stripe' : 'Bankas pārskaitījums'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Statuss</p>
                                    <p className={`font-medium ${order.paymentStatus === 'paid'
                                        ? 'text-green-600'
                                        : order.paymentStatus === 'failed'
                                            ? 'text-red-600'
                                            : 'text-yellow-600'
                                        }`}>
                                        {order.paymentStatus === 'paid' && 'Apmaksāts'}
                                        {order.paymentStatus === 'pending' && 'Gaida'}
                                        {order.paymentStatus === 'failed' && 'Neizdevās'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status Update */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Mainīt Statusu</h2>
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="pending">Gaida</option>
                                <option value="processing">Apstrādē</option>
                                <option value="shipped">Nosūtīts</option>
                                <option value="delivered">Piegādāts</option>
                                <option value="cancelled">Atcelts</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
