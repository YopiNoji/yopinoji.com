module.exports = {
  theme: {
    extend: {
      height: {
       over: '200vh',
      },
      width: {
       over: '200vw',
      },
      animation: {
        'float': '20s ease-in-out infinite reverse float',
      },
      keyframes: {
         float: {
           '0%': { transform: 'translateX(100vw) rotate(45deg);' },
           '100%': { transform: 'translateX(-100vw) rotate(45deg)' },
         }
      }
    },
  },
  purge: {
    enabled: false,
    mode: 'layers',
    preserveHtmlElements: false,
    content: ['./src/**/*.tsx',],
  },
  darkMode: 'class',
  variants: {},
  plugins: [],
}
