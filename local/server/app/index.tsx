import { Router } from "../deps.ts";
import App, { loading } from "./App.tsx";
// import "./styles.css";

const router = new Router();

const jsBundle = "/main.js";

const js = `import React from "https://jspm.dev/react@16.13.1";
 import ReactDOM from "https://jspm.dev/react-dom@16.13.1";
 const App = ${App};
 ReactDOM.hydrate(React.createElement(App), document.getElementById('app'));`;

const html = `<!DOCTYPE html>
  <html>
    <head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

      <script type="module" src="${jsBundle}"></script>
    </head>
    <body>
    <div class="container center-align">

      <main id="app">${loading}</main >
      </div>

      <script type="text/javascript" src="js/materialize.min.js"></script>

        </body>
        </html>
        `;

router
  .get("/ssr", (ctx) => {
    ctx.response.type = "text/html";
    ctx.response.body = html;
  })
  .get(jsBundle, (ctx) => {
    ctx.response.type = "application/javascript";
    ctx.response.body = js;
  });

export { router as reactSSR };
