/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hamilton: ['Hamilton Script', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        beanco: ['Beanco Script', 'cursive'],
        peristiwa: ['Peristiwa', 'sans-serif'],
      },
      keyframes: {
        horizontalBounce: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(25%)' }, // Adjust the percentage for more or less shake
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' }, // Change this color to match your text color
        },
      },
      animation: {
        typewriter: 'typewriter 2s steps(20) 0.5s forwards',
        blink: 'blink 1s steps(2) infinite',
        horizontalBounce: 'horizontalBounce 1s infinite',
      },
      animationDuration: {
        '4s': '4s',
        '1s': '1s',
      },
      animationDelay: {
        '1s': '1s',
      },
    },
  },

  plugins: [],
}

