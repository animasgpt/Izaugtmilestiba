import { NextResponse } from 'next/server';
import { getAllProducts, createProduct, type Product } from '@/lib/db/products';

export async function GET() {
    try {
        const products = await getAllProducts();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.price) {
            return NextResponse.json(
                { error: 'Name and price are required' },
                { status: 400 }
            );
        }

        const newProduct = await createProduct(body);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
