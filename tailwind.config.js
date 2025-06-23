/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-navy": "#264653",
        "teal-ocean": "#2a9d8f",
        "sand-gold": "#e9c46a",
        "sunset-orange": "#f4a261",
        "clay-red": "#e76f51",
        // "deep-navy": "#f5e3d3",
        // "teal-ocean": "#b6a78d",
        // "sand-gold": "#c9d6ea",
        // "sunset-orange": "#f4a261",
        // "clay-red": "#e76f51",
      },
    },
  },
  plugins: [],
};
