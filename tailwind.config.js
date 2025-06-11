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
                black: '#463B34',

                yellow: {
                    primary: '#F3CA52',
                    secondary: '#F6E9B2',
                },

                green: {
                    primary: '#0A6847',
                    secondary: '#7ABA78',
                },

                red: {
                    primary: '#F65B3C',
                    secondary: '#E9F2CF',
                },
                white: '#FFFFFF',
            },
        },
    },

    plugins: [forms, require('@tailwindcss/line-clamp')],
};
