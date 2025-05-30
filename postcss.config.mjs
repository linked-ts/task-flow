const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "autoprefixer": {},
    "postcss-preset-env": {
      features: {
        "custom-properties": false,
      },
    },
  },
};

export default config;
