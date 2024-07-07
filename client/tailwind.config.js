/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandDark: "#001A83 ",
        brandDefault:" #002DE3",
        brandDarkMode:" #375FFF",
        brandLight:" #879FFF",
        brandBackground:" #D2D5F9",
        neutralActive : "#0F182B",
        neutralDark : "#152033",
        neutralBody : "#1B2B4B",
        neutralWeak : "#A4A4A4",
        neutralDisabled : "#ADB5BD",
        neutralLine : "#EDEDED",
        neutralOffWhite : "#F7F7FC",
        neutralWhite : "#FFFFFF",
        accentDanger : "#E94242",
        accentWarning : "#FDCF41",
        accentSuccess : "#2CC069",
        accentSafe : "#7BCBCF",
      }
    },
  },
  plugins: [],
}

