module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        heroBG: "url('/Lawrencium2.png')",
      },
    },
    fontFamily: {
      body: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
