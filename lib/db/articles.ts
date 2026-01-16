import { prisma } from '../prisma'

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string;
    categoryName: string;
    readTime: string | null;
    author: string;
    date: Date | string;
    published: boolean;
}

export async function getAllArticles() {
    return await prisma.article.findMany({
        orderBy: {
            date: 'desc'
        }
    })
}

export async function getArticleById(id: string) {
    // Try to find by ID first
    let article = await prisma.article.findUnique({
        where: { id }
    })

    // If not found, try to find by slug
    if (!article) {
        article = await prisma.article.findUnique({
            where: { slug: id }
        })
    }

    return article
}

export async function createArticle(data: any) {
    const slug = data.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')

    return await prisma.article.create({
        data: {
            title: data.title,
            slug: data.slug || slug || `article-${Date.now()}`,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            categoryName: data.categoryName,
            readTime: data.readTime,
            author: data.author || 'Laura Bērziņa',
            date: data.date ? new Date(data.date) : new Date(),
            published: data.published ?? false,
        }
    })
}

export async function updateArticle(id: string, data: any) {
    return await prisma.article.update({
        where: { id },
        data: {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            categoryName: data.categoryName,
            readTime: data.readTime,
            author: data.author,
            date: data.date ? new Date(data.date) : undefined,
            published: data.published,
        }
    })
}

export async function deleteArticle(id: string) {
    try {
        await prisma.article.delete({
            where: { id }
        })
        return true
    } catch (error) {
        return false
    }
}

export async function bulkCreateArticles(articlesData: any[]) {
    const results = []
    for (const data of articlesData) {
        const result = await createArticle(data)
        results.push(result)
    }
    return results
}
