/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                'primary-hover': 'var(--primary-hover)',
                secondary: 'var(--secondary-color)',
                'secondary-hover': 'var(--secondary-hover)',
                'background-light': 'var(--background-light)',
                'background-dark': 'var(--background-dark)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-light': 'var(--text-light)',
                'error-color': 'var(--error-color)',
                'success-color': 'var(--success-color)',
                'warning-color': 'var(--warning-color)',
            },
        },
    },
    plugins: [],
}
