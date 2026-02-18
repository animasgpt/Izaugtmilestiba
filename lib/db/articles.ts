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
    image: string | null;
    date: Date | string;
    published: boolean;
}

export async function getAllArticles(publishedOnly = false) {
    return await prisma.article.findMany({
        where: publishedOnly ? { published: true } : {},
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
    try {
        const generatedSlug = data.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Noņem diakritiskās zīmes (ā -> a)
            .replace(/[^a-z0-9]+/g, '-')     // Nomaina visu, kas nav burts vai cipars, pret svītriņu
            .replace(/^-+|-+$/g, '');        // Noņem svītriņas sākumā un beigās

        return await prisma.article.create({
            data: {
                title: data.title,
                slug: data.slug || generatedSlug || `article-${Date.now()}`,
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                categoryName: data.categoryName,
                readTime: data.readTime,
                author: data.author || 'Madara Pauzere',
                image: data.image,
                date: data.date ? new Date(data.date) : new Date(),
                published: data.published ?? false,
            }
        })
    } catch (error) {
        console.error('Error in createArticle:', error);
        throw error;
    }
}

export async function updateArticle(id: string, data: any) {
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.categoryName !== undefined) updateData.categoryName = data.categoryName;
    if (data.readTime !== undefined) updateData.readTime = data.readTime;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.date !== undefined) updateData.date = new Date(data.date);
    if (data.published !== undefined) updateData.published = data.published;

    return await prisma.article.update({
        where: { id },
        data: updateData
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
