module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette de couleurs sombre et moderne pour Klinet
        'klinet-dark': '#121212',
        'klinet-gray': '#1E1E1E',
        'klinet-blue': '#0A2342',
        'klinet-accent-blue': '#2196F3',
        'klinet-accent-green': '#4CAF50',
        'klinet-text': '#E0E0E0'
      },
      fontFamily: {
        'sans': ['Roboto', 'Open Sans', 'Lato', 'sans-serif']
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
      }
    },
  },
  plugins: [],
}
