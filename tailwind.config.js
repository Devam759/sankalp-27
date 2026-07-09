/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#f5821e',
          blue: '#184176',
          ink: '#030404',
          cloud: '#ffffff',
          lightBlue: '#215798',
        },
        primary: {
          DEFAULT: '#f5821e',
          dark: '#d16e18',
        },
        secondary: {
          DEFAULT: '#184176',
          dark: '#112f55',
          light: '#215798',
        },
        accent: {
          DEFAULT: '#f5821e',
          dark: '#d16e18',
        },
        dark: {
          DEFAULT: '#030404',
          lighter: '#1a1a1a',
        },
        admin: {
          bg: '#ffffff',
          surface: '#ffffff',
          accent: '#f5821e',
          text: '#030404',
          muted: '#64748b',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        serif: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #f5821e 0%, #184176 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(245,130,30,0.15) 0%, rgba(24,65,118,0.15) 100%)',
        'glass-gradient': 'linear-gradient(to bottom right, rgba(245, 241, 229, 0.08), rgba(245, 241, 229, 0.03))',
      },
      boxShadow: {
        'brand-orange': '0 0 40px rgba(245, 130, 30, 0.25)',
        'brand-blue': '0 0 40px rgba(24, 65, 118, 0.25)',
      },
    },
  },
  plugins: [],
}
