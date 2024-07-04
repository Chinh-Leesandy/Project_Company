/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['Dancing Script', 'cursive']
      },
      backgroundImage: {
        home: "url('https://i.pinimg.com/564x/57/17/d0/5717d04b66c602cdf5b1aa6da9962f8c.jpg')",
        'footer-texture': "url('/img/footer-texture.png')"
      }
    }
  },
  plugins: []
}
