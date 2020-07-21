const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  distDir: "nextjs",
  env: {
    FIREBASE_PROJECT_ID: "shelf-io",
  },
  experimental: {
    sprFlushToDisk: false,
  },
});
