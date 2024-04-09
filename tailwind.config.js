/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // screens: {
      //   xs: "390px",
      //   sm: "640px",
      // },
      backgroundImage: {
        cubes: "url('/Cubes.png')",
      },
      boxShadow: {
        custom: "10px 9px 22px rgba(20, 78, 227, 0.38);",
      },
    },
  },
  plugins: [],
};
