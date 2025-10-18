/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mindaro: '#c5d86d',
        licorice: '#261c15',
        'baby-powder': '#f7f7f2',
        beige: '#e4e6c3',
        'giants-orange': '#f05d23',
      },
    },
  },
  plugins: [],
}
