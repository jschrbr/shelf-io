const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    startUrl: "/",
  },
  distDir: "nextjs",
  env: {
    FIREBASE_PROJECT_ID: "shelf-io",
  },
  experimental: {
    sprFlushToDisk: false,
  },
});
