/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Tailwind'in hangi dosyalarda sınıf arayacağını belirtir
    ],
    theme: {
      extend: {
        colors: {
          'custom-gray-blue': '#9AB5C7', // rgb(154,181,199)
          'custom-dark': '#010606', // rgba(1,6,6,0.9249)
        },
        backgroundImage: {
          'custom-gradient': 'linear-gradient(225deg, #9AB5C7 0%, #9AB5C7 0%, #010606ED 39%)',
        },
      },
    },
    plugins: [],
  };