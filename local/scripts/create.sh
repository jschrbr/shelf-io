#!/bin/bash
if command -v heroku
then
npm i -g heroku 
fi
heroku login
heroku create example
heroku buildpacks:set https://github.com/chibat/heroku-buildpack-deno.git
heroku addons:create jawsdb