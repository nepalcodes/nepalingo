import { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D03641",
        black: "#1A1A1A",
        white: "#F8F4F4",
        grayDark: "#2B2B2B",
        grayLight: "#C8C8C8",
      },
      fontFamily: {
        primary: [
          "Nunito",
          "Noto Sans Devanagari",
          "Noto Sans Newa",
          "system-ui",
          "sans-serif",
        ],
        secondary: [
          "Roboto",
          "Noto Sans Devanagari",
          "Noto Sans Newa",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
