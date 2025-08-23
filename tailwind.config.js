/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  safelist: [
    // bg, border, text, from, to, dark:from, dark:to, etc. for all used colors
    'bg-red-50', 'bg-blue-50', 'bg-emerald-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-cyan-50', 'bg-stone-50',
    'bg-red-100', 'bg-blue-100', 'bg-emerald-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-cyan-100', 'bg-stone-100',
    'bg-red-200', 'bg-blue-200', 'bg-emerald-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200', 'bg-cyan-200', 'bg-stone-200',
    'bg-red-400', 'bg-blue-400', 'bg-emerald-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-cyan-400', 'bg-stone-400',
    'bg-red-500', 'bg-blue-500', 'bg-emerald-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500', 'bg-stone-500',
    'bg-red-600', 'bg-blue-600', 'bg-emerald-600', 'bg-yellow-600', 'bg-purple-600', 'bg-pink-600', 'bg-cyan-600', 'bg-stone-600',
    'bg-red-700', 'bg-blue-700', 'bg-emerald-700', 'bg-yellow-700', 'bg-purple-700', 'bg-pink-700', 'bg-cyan-700', 'bg-stone-700',
    'bg-red-800', 'bg-blue-800', 'bg-emerald-800', 'bg-yellow-800', 'bg-purple-800', 'bg-pink-800', 'bg-cyan-800', 'bg-stone-800',
    'bg-red-900', 'bg-blue-900', 'bg-emerald-900', 'bg-yellow-900', 'bg-purple-900', 'bg-pink-900', 'bg-cyan-900', 'bg-stone-900',
    'bg-red-950', 'bg-blue-950', 'bg-emerald-950', 'bg-yellow-950', 'bg-purple-950', 'bg-pink-950', 'bg-cyan-950', 'bg-stone-950',
    'from-red-50', 'from-blue-50', 'from-emerald-50', 'from-yellow-50', 'from-purple-50', 'from-pink-50', 'from-cyan-50', 'from-stone-50',
    'to-red-100', 'to-blue-100', 'to-emerald-100', 'to-yellow-100', 'to-purple-100', 'to-pink-100', 'to-cyan-100', 'to-stone-100',
    'dark:from-red-950', 'dark:from-blue-950', 'dark:from-emerald-950', 'dark:from-yellow-950', 'dark:from-purple-950', 'dark:from-pink-950', 'dark:from-cyan-950', 'dark:from-stone-950',
    'border-red-200', 'border-blue-200', 'border-emerald-200', 'border-yellow-200', 'border-purple-200', 'border-pink-200', 'border-cyan-200', 'border-stone-200',
    'dark:border-red-700', 'dark:border-blue-700', 'dark:border-emerald-700', 'dark:border-yellow-700', 'dark:border-purple-700', 'dark:border-pink-700', 'dark:border-cyan-700', 'dark:border-stone-700',
    'text-red-600', 'text-blue-600', 'text-emerald-600', 'text-yellow-600', 'text-purple-600', 'text-pink-600', 'text-cyan-600', 'text-stone-600',
    'dark:text-red-400', 'dark:text-blue-400', 'dark:text-emerald-400', 'dark:text-yellow-400', 'dark:text-purple-400', 'dark:text-pink-400', 'dark:text-cyan-400', 'dark:text-stone-400',
    'text-red-700', 'text-blue-700', 'text-emerald-700', 'text-yellow-700', 'text-purple-700', 'text-pink-700', 'text-cyan-700', 'text-stone-700',
    'dark:text-red-300', 'dark:text-blue-300', 'dark:text-emerald-300', 'dark:text-yellow-300', 'dark:text-purple-300', 'dark:text-pink-300', 'dark:text-cyan-300', 'dark:text-stone-300',
    'border-red-300', 'border-blue-300', 'border-emerald-300', 'border-yellow-300', 'border-purple-300', 'border-pink-300', 'border-cyan-300', 'border-stone-300',
    'dark:border-red-600', 'dark:border-blue-600', 'dark:border-emerald-600', 'dark:border-yellow-600', 'dark:border-purple-600', 'dark:border-pink-600', 'dark:border-cyan-600', 'dark:border-stone-600',
    // Add more if you use more variants
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};