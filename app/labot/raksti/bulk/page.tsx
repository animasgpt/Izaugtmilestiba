'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { CloudArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function BulkUploadPage() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [jsonData, setJsonData] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0]
        if (!uploadedFile) return

        setFile(uploadedFile)

        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string
                setJsonData(content)
            } catch (error) {
                alert('Neizdevās nolasīt failu')
            }
        }
        reader.readAsText(uploadedFile)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setResult(null)

        try {
            const articles = JSON.parse(jsonData)

            if (!Array.isArray(articles)) {
                throw new Error('JSON jābūt masīvam')
            }

            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articles),
            })

            const data = await response.json()

            if (response.ok) {
                setResult({ success: true, count: data.count })
                setTimeout(() => router.push('/labot/raksti'), 2000)
            } else {
                setResult({ success: false, error: data.error })
            }
        } catch (error: any) {
            setResult({ success: false, error: error.message })
        } finally {
            setLoading(false)
        }
    }

    const exampleJSON = `[
  {
    "title": "Raksta nosaukums",
    "excerpt": "Īss apraksts (150-200 rakstzīmes)",
    "content": "Pilns raksta saturs ar markdown formatēšanu...",
    "category": "sarunas",
    "categoryName": "Sarunas",
    "readTime": "5 min",
    "author": "Laura Bērziņa",
    "published": true
  },
  {
    "title": "Vēl viens raksts",
    "excerpt": "Cits apraksts...",
    "content": "Saturs...",
    "category": "gaidibas",
    "categoryName": "Gaidības",
    "readTime": "7 min",
    "author": "Laura Bērziņa",
    "published": false
  }
]`

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container-custom py-4">
                    <h1 className="text-2xl font-display font-bold">Bulk Upload - Raksti</h1>
                    <p className="text-gray-600">Augšupielādē vairākus rakstus vienlaicīgi</p>
                </div>
            </header>

            <div className="container-custom py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Form */}
                    <div>
                        <Card>
                            <h2 className="text-xl font-semibold mb-4">Augšupielādēt JSON Failu</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Izvēlies JSON failu
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600">
                                                {file ? file.name : 'Klikšķini vai velc failu šeit'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">JSON formāts</p>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Vai ielīmē JSON datus
                                    </label>
                                    <textarea
                                        value={jsonData}
                                        onChange={(e) => setJsonData(e.target.value)}
                                        className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm"
                                        placeholder="Ielīmē JSON datus šeit..."
                                    />
                                </div>

                                {result && (
                                    <div className={`p-4 rounded-lg ${result.success
                                            ? 'bg-green-50 border border-green-200 text-green-700'
                                            : 'bg-red-50 border border-red-200 text-red-700'
                                        }`}>
                                        {result.success ? (
                                            <p>✅ Veiksmīgi augšupielādēti {result.count} raksti!</p>
                                        ) : (
                                            <p>❌ Kļūda: {result.error}</p>
                                        )}
                                    </div>
                                )}

                                <div className="flex space-x-3">
                                    <Button
                                        type="submit"
                                        disabled={!jsonData || loading}
                                        className="flex-1"
                                    >
                                        {loading ? 'Augšupielādē...' : 'Augšupielādēt Rakstus'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push('/labot/raksti')}
                                    >
                                        Atcelt
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Example */}
                    <div>
                        <Card>
                            <h2 className="text-xl font-semibold mb-4">Piemērs</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                JSON failam jābūt masīvam ar rakstu objektiem. Katram rakstam nepieciešamie lauki:
                            </p>

                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                <pre className="text-xs text-green-400 font-mono">
                                    {exampleJSON}
                                </pre>
                            </div>

                            <div className="mt-6 space-y-3">
                                <h3 className="font-semibold text-sm">Lauku apraksti:</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li><strong>title:</strong> Raksta nosaukums</li>
                                    <li><strong>excerpt:</strong> Īss apraksts (150-200 rakstzīmes)</li>
                                    <li><strong>content:</strong> Pilns raksta saturs</li>
                                    <li><strong>category:</strong> Kategorijas slug (gaidibas, dzives-gads, 2-3-gadi, bernudarzs, sarunas)</li>
                                    <li><strong>categoryName:</strong> Kategorijas nosaukums</li>
                                    <li><strong>readTime:</strong> Lasīšanas laiks (piem., "5 min")</li>
                                    <li><strong>author:</strong> Autora vārds</li>
                                    <li><strong>published:</strong> true/false (vai publicēt uzreiz)</li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
