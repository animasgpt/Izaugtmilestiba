import { NextResponse } from 'next/server';
import {
    getOrderById,
    updateOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
} from '@/lib/db/orders';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const order = getOrderById(params.id);

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        // Handle specific status updates
        if (body.action === 'updateStatus' && body.status) {
            const updated = updateOrderStatus(params.id, body.status);
            if (!updated) {
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json(updated);
        }

        if (body.action === 'updatePayment' && body.paymentStatus) {
            const updated = updatePaymentStatus(params.id, body.paymentStatus);
            if (!updated) {
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json(updated);
        }

        // General update
        const updated = updateOrder(params.id, body);

        if (!updated) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const success = deleteOrder(params.id);

        if (!success) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}
