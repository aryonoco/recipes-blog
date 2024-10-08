function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", "[data-theme='dark']"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Remove the following screen breakpoint or add other breakpoints
    // if one breakpoint is not enough for you
    screens: {
      sm: "640px",
    },

    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-fill"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-text-base"),
          card: withOpacity("--color-card"),
          "card-muted": withOpacity("--color-card-muted"),
        },
      },
      outlineColor: {
        skin: {
          fill: withOpacity("--color-accent"),
        },
      },
      borderColor: {
        skin: {
          line: withOpacity("--color-border"),
          fill: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
      },
      fill: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
        transparent: "transparent",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        serif: ["Fraunces", "serif"],
      },

      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
              'font-family': '"Space Mono", monospace'
            },
            code: {
              color: false,
              'font-family': '"Space Mono", monospace'
            },
            'h1, h2, h3, h4, h5, h6': {
              'font-family': '"Fraunces", serif',
              'font-optical-sizing': 'auto',
              'font-variation-settings': '"SOFT" 0, "WONK" 1',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
