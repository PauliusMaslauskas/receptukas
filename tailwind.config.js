import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'primary-green': '#6AB547',
                'accent-yellow': '#FFC107',
                'warm-red': '#E63946',
                'neutral-light': '#F8F9FA',
                'neutral-dark': '#212529',
                'secondary-brown': '#A6825E',
                'light-bg': '#F8F9FA',
                'warm-beige': '#FFF9F1',
                'dark-bg': '#212529',
                'dark-green': '#2E3B2F',
                'dark-brown': '#3E2E1E',
            },
        },
    },

    plugins: [forms, require('@tailwindcss/line-clamp')],
};
