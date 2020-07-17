const admin = require("firebase-admin");
const functions = require("firebase-functions");
const next = require("next");
const config = require("./next.config");

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const ssr = next({
  dev,
  conf: config,
});
const handle = ssr.getRequestHandler();

const server = functions.https.onRequest((request, response) => {
  // log the page.js file or resource being requested
  console.log("File: " + request.originalUrl);
  return ssr.prepare().then(() => handle(request, response));
});

exports.nextjs = { server };
