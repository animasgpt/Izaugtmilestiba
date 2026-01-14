import { NextResponse } from 'next/server';
import { getAllOrders, getOrderStats } from '@/lib/db/orders';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const statsOnly = searchParams.get('stats');

        if (statsOnly === 'true') {
            const stats = getOrderStats();
            return NextResponse.json(stats);
        }

        const orders = getAllOrders();
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
