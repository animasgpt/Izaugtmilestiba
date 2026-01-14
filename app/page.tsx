import HeroSection from '@/components/home/HeroSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import ArticlesPreview from '@/components/home/ArticlesPreview'
import PodcastPreview from '@/components/home/PodcastPreview'
import ChatbotCTA from '@/components/home/ChatbotCTA'

export default function Home() {
    return (
        <div className="min-h-screen">
            <div className="mb-16 md:mb-24">
                <HeroSection />
            </div>
            <div className="mb-16 md:mb-24">
                <ServicesPreview />
            </div>
            <div className="mb-16 md:mb-24">
                <ArticlesPreview />
            </div>
            <div className="mb-16 md:mb-24">
                <PodcastPreview />
            </div>
            <ChatbotCTA />
        </div>
    )
}
