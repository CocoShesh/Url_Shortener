/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "430px",
        xs: "380px",
      },
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
