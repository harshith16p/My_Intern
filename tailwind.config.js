/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "451px", //modify the screen width
      md: "800px",
      lg: "1000px",
      "2lg": "1200px",
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      darkMode: 'class',
      // ...other configurations
      fontFamily: {
        sans: ['"Open Sans", sans-serif'],
      },
    },
    letterSpacing: {
      sm: "0.2px",
    },
  },
  plugins: [],
};
