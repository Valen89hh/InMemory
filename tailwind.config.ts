import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#003F5F",
        black: "#1E1E1E",
        "gray-dark": "#757575",
        "background": "#F4F4F4",
        "gray-light": "#D9D9D9"
      },
      screens: {
        xs: "480px",
        xxs: "400px"
      }
    },
    
  },
  plugins: [],
};
export default config;
