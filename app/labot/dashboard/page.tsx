'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
    DocumentTextIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    ChartBarIcon,
    ArrowRightOnRectangleIcon,
    PlusIcon,
    LanguageIcon,
} from '@heroicons/react/24/outline'

const stats = [
    { name: 'Kopā raksti', value: '6', icon: DocumentTextIcon, color: 'bg-blue-500' },
    { name: 'Pasūtījumi', value: '12', icon: ShoppingBagIcon, color: 'bg-green-500' },
    { name: 'Reģistrētie lietotāji', value: '48', icon: UserGroupIcon, color: 'bg-purple-500' },
    { name: 'Šī mēneša ieņēmumi', value: '€342', icon: ChartBarIcon, color: 'bg-yellow-500' },
]

const quickActions = [
    { name: 'Pievienot rakstu', href: '/labot/raksti/jauns', icon: PlusIcon, color: 'bg-primary-500' },
    { name: 'Skatīt rakstus', href: '/labot/raksti', icon: DocumentTextIcon, color: 'bg-secondary-500' },
    { name: 'Vizuālais redaktors', href: '/labot/teksti/vizualais', icon: LanguageIcon, color: 'bg-purple-500' },
    { name: 'Vietnes teksti', href: '/labot/teksti', icon: LanguageIcon, color: 'bg-indigo-500' },
    { name: 'Pasūtījumi', href: '/labot/pasutijumi', icon: ShoppingBagIcon, color: 'bg-green-500' },
]

const recentActivity = [
    { action: 'Jauns pasūtījums', item: 'Grāmata "Izaugt Mīlestībā"', time: 'Pirms 2 stundām' },
    { action: 'Jauns raksts', item: 'Kā palīdzēt bērnam ar emocijām', time: 'Pirms 5 stundām' },
    { action: 'Jauns lietotājs', item: 'anna.berzina@gmail.com', time: 'Vakar' },
]

export default function DashboardPage() {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/labot')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-3">
                                <img
                                    src="/images/IM-sirds pirms.png"
                                    alt="Izaugt Mīlestībā"
                                    className="h-12 w-auto"
                                />
                                <div>
                                    <div className="text-xs text-gray-500">Admin Panelis</div>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Sveika, <strong>Madara</strong>!</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                <span>Iziet</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container-custom py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <Card key={stat.name} className="relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-display font-bold mb-4">Ātrās Darbības</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {quickActions.map((action) => (
                            <Link key={action.name} href={action.href}>
                                <Card className="text-center hover:scale-105 transition-transform cursor-pointer">
                                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                                        <action.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <p className="font-semibold text-sm">{action.name}</p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <Card>
                        <h3 className="text-xl font-display font-bold mb-4">Pēdējās Aktivitātes</h3>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{activity.action}</p>
                                        <p className="text-sm text-gray-600">{activity.item}</p>
                                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Links */}
                    <Card>
                        <h3 className="text-xl font-display font-bold mb-4">Pārvaldība</h3>
                        <div className="space-y-3">
                            <Link href="/labot/raksti" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Rakstu pārvaldība</span>
                                    <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </Link>
                            <Link href="/labot/produkti" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Produktu pārvaldība</span>
                                    <ShoppingBagIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </Link>
                            <Link href="/labot/pasutijumi" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Pasūtījumi</span>
                                    <ShoppingBagIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </Link>
                            <Link href="/labot/teksti" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Vietnes teksti</span>
                                    <LanguageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </Link>
                            <Link href="/labot/lietotaji" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Lietotāji</span>
                                    <UserGroupIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
