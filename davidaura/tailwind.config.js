module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        loaderAnimation: "loaderAnim 1s linear infinite alternate",
        loaderMove: "loaderMoveAnim 1s linear infinite alternate",
        loaderBounce: "loaderBounceAnim 0.5s cubic-bezier(0,200,0.8,200) infinite",
      },
      keyframes: {
        loaderAnim: {
          "0%": { backgroundPosition: "0% 100%, 50% 0, 100% 0" },
          "8%, 42%": { backgroundPosition: "0% 0, 50% 0, 100% 0" },
          "50%": { backgroundPosition: "0% 0, 50% 100%, 100% 0" },
          "58%, 92%": { backgroundPosition: "0% 0, 50% 0, 100% 0" },
          "100%": { backgroundPosition: "0% 0, 50% 0, 100% 100%" },
        },
        loaderMoveAnim: {
          "100%": { left: "calc(100% - 8px)" },
        },
        loaderBounceAnim: {
          "100%": { top: "-0.1px" },
        },
      },
    },
  },
  plugins: [],
};
