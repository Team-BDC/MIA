module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      20: "20px",
    },
    borderRadius: {
      none: "0",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "20px",
    },
    extend: {
      width: {
     
        '6/7': '85.7142857%',
        '95':'95%',
        '90':'90%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
