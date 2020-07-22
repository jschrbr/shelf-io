<h1 align="center">Welcome to shelf-io 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Shelf-io is a real-time progressive web app for managing a store's stock, with a real world feedback-loop using IoT devices.

### 🏠 [Homepage](https://github.com/jschrbr/shelf-io)

### ✨ [Demo](http://shelf-io.web.app/)

### 🎡 [Playground](https://us-central1-shelf-io.cloudfunctions.net/graphql)

> check the playground url is set to the /graphql endpoint

## Install

```sh
#From inside the shelf-io directory
yarn setup
```

> [rshell](https://github.com/dhylands/rshell) is required for the IoT component. The device is set up according to the [M5stack](https://github.com/m5stack/M5Stack_MicroPython) micorPython build - but should work with other microPython boards.

##### Hardware

- [M5Stack](https://m5stack.com/)
- [HX711](https://learn.sparkfun.com/tutorials/load-cell-amplifier-hx711-breakout-hookup-guide/all)
- [Load-cell](https://g.co/kgs/9WfgFi)

## Usage

> Ensure you have updated the config files in the web and functions folder with your project details.

```sh
#Deploy project to firebase
yarn deploy;

#Deploy graphql and firestore trigger
yarn deploy:server

#Deploy next.js client
yarn deploy:client

#Develop next.js client
yarn dev:client

# For IoT client - m5stack running microPython
cd IoT/
#Run a REPL on the device
npm run repl

#Flash the device
npm run flash

#Dev mode (flash the device on saved changes)
npm run watch
```

## Author

👤 **James Schreiber**

- Website: https://jschrbr.github.io/portfolio/
- Github: [@jschrbr](https://github.com/jschrbr)
- LinkedIn: [@techsmechs](https://linkedin.com/in/techsmechs)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jschrbr/shelf-io/issues).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/techsmechs">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
