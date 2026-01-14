interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    padding?: 'sm' | 'md' | 'lg'
}

export default function Card({
    children,
    className = '',
    hover = true,
    padding = 'md',
}: CardProps) {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    }

    return (
        <div
            className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
                } ${paddingClasses[padding]} ${className}`}
        >
            {children}
        </div>
    )
}
