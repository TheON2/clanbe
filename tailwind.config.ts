import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
        light: '#85d7ff',
        default: '#1fb6ff',
        dark: '#009eeb',
      },
      pink: {
        light: '#ff7ce5',
        default: '#ff49db',
        dark: '#ff16d1',
      },
      gray: {
        deep:'#111827',
        darkest: '#1f2d3d',
        dark: '#3c4858',
        default: '#c0ccda',
        light: '#e0e6ed',
        lightest: '#f9fafc',
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: { lg: "1300px" ,'custom': '1000px',},
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
