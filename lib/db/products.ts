import { prisma } from '../prisma'

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
    inStock: boolean;
    featured: boolean;
}

export async function getAllProducts() {
    return await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function getProductById(id: string) {
    return await prisma.product.findUnique({
        where: { id }
    })
}

export async function createProduct(data: any) {
    return await prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            image: data.image,
            category: data.category,
            inStock: data.inStock ?? true,
            featured: data.featured ?? false,
        }
    })
}

export async function updateProduct(id: string, data: any) {
    return await prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            price: data.price ? parseFloat(data.price) : undefined,
            image: data.image,
            category: data.category,
            inStock: data.inStock,
            featured: data.featured,
        }
    })
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        })
        return true
    } catch (error) {
        return false
    }
}
