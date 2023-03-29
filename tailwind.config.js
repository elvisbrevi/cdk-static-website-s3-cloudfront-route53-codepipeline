/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#3A98B9",
        secondary: "#FFF1DC",
        tertiary: "#E8D5C4",
        danger: "#EEEEEE",
      },
      textColor: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        tertiary: "#38c172",
        danger: "#e3342f",
      },
      // Añade los estilos oscuros aquí
      dark: {
        backgroundColor: {
          primary: "#03001C",
          secondary: "#301E67",
          tertiary: "#5B8FB9",
          danger: "#B6EADA",
        },
        textColor: {
          primary: "#e5e7eb",
          secondary: "#9ca3af",
          tertiary: "#6b7280",
          danger: "#e3342f",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
