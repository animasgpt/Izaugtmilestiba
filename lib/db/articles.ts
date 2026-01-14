// Demo articles database (in production, this would be a real database)
let articles = [
    {
        id: '1',
        title: 'Kā palīdzēt bērnam tikt galā ar emocijām',
        excerpt: 'Emociju regulācija ir svarīga prasme, ko bērni apgūst pakāpeniski.',
        content: 'Pilns raksta saturs...',
        category: 'sarunas',
        categoryName: 'Sarunas',
        readTime: '5 min',
        date: '2026-01-10',
        author: 'Laura Bērziņa',
        published: true,
    },
    // ... more articles
]

export function getAllArticles() {
    return articles
}

export function getArticleById(id: string) {
    return articles.find(a => a.id === id)
}

export function createArticle(data: any) {
    const newArticle = {
        id: Date.now().toString(),
        ...data,
        date: new Date().toISOString().split('T')[0],
        published: data.published ?? false,
    }

    articles.push(newArticle)
    return newArticle
}

export function updateArticle(id: string, data: any) {
    const index = articles.findIndex(a => a.id === id)
    if (index === -1) return null

    articles[index] = { ...articles[index], ...data }
    return articles[index]
}

export function deleteArticle(id: string) {
    const index = articles.findIndex(a => a.id === id)
    if (index === -1) return false

    articles.splice(index, 1)
    return true
}

export function bulkCreateArticles(articlesData: any[]) {
    const created = articlesData.map(data => createArticle(data))
    return created
}
