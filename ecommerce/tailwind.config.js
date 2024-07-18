/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ['"Poetsen One"', "sans-serif"],
        lora:['"Lora", serif'],
        abel:['"Abel", sans-serif'],
        lato:['"lato",sans-serif']
      },
    },
  },
  plugins: [flowbite.plugin()],
};
