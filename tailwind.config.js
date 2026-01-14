/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f4ee',
                    100: '#dce7d6',
                    200: '#b9cfad',
                    300: '#96b784',
                    400: '#739f5b',
                    500: '#4A6741', // Tumši zaļš
                    600: '#3c5334',
                    700: '#2e3f27',
                    800: '#202b1a',
                    900: '#12170d',
                },
                secondary: {
                    50: '#f5f8f3',
                    100: '#e8f0e3',
                    200: '#d1e1c7',
                    300: '#bad2ab',
                    400: '#a3c38f',
                    500: '#8AA37B', // Gaiši zaļš
                    600: '#6e8262',
                    700: '#53624a',
                    800: '#384131',
                    900: '#1d2119',
                },
                accent: {
                    50: '#fefdfb',
                    100: '#fdf9f0',
                    200: '#faf3e1',
                    300: '#f7edd2',
                    400: '#f5e7c3',
                    500: '#D4AF37', // Zelta dzeltens
                    600: '#c09a1f',
                    700: '#8f7317',
                    800: '#5f4d0f',
                    900: '#2f2608',
                },
                cream: {
                    50: '#fefdfb',
                    100: '#fdfbf7',
                    200: '#fcf9f0',
                    300: '#faf7e8',
                    400: '#f9f6e8', // Gaišs krēmkrāsas
                    500: '#F2E8C4', // Krēmkrāsas dzeltens
                    600: '#e8d9a0',
                    700: '#d9c57c',
                    800: '#cab158',
                    900: '#bb9d34',
                },
                sand: {
                    50: '#f7f4f0',
                    100: '#efe9e1',
                    200: '#dfd3c3',
                    300: '#cfbda5',
                    400: '#bfa787',
                    500: '#C7B299', // Smilšu brūns
                    600: '#a08e7a',
                    700: '#796a5b',
                    800: '#52463c',
                    900: '#2b231e',
                },
            },
            fontFamily: {
                sans: ['Open Sans', 'system-ui', 'sans-serif'],
                display: ['Merriweather', 'Georgia', 'serif'],
                body: ['Open Sans', 'system-ui', 'sans-serif'],
            },
            backgroundColor: {
                'light': '#FCFBF4',
            },
            textColor: {
                'dark': '#2C3E29',
                'light': '#F9F6E8',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
