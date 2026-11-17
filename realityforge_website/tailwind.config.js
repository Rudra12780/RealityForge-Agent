/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Eclipse Elixir Theme Palette
        eclipse: {
          deep: '#151622',
          DEFAULT: '#1D1E2C', // Exact Eclipse Elixir (#1D1E2C)
          surface: '#252637',
          hover: '#2D2F44',
          border: '#353750',
          muted: '#8E90A6',
          light: '#3C3E5A',
        },
        darkBg: '#1D1E2C', // Eclipse Elixir
        darkCard: '#252637',
        darkCardHover: '#2D2F44',
        darkBorder: '#353750',
        lightBg: '#f8f9fc',
        lightCard: '#ffffff',
        lightBorder: '#e2e6f0',
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
