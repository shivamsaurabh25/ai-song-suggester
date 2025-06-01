module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Urbanist', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 4s infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};