const colors = require('tailwindcss/colors')


module.exports = {
  node: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    maxWidth: { 
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
     },
    extend: {
      colors: {
        cyan: colors.cyan,
        teal: colors.teal
      },
      backgroundImage: {
        //'afro-pattern': "url('../public/assets/images/afropattern.jpeg')",
      //  'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
