/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // For React/Vite/Next.js inside src
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js (if applicable)
    "./components/**/*.{js,ts,jsx,tsx}", // For reusable components
    "./app/**/*.{js,ts,jsx,tsx}", // If using Next.js App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
