#!/bin/bash
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.1.2
export DENO_INSTALL=$HOME/.deno
export PATH=$DENO_INSTALL/bin:$PATH
deno --version
deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@v2.2.0/denon.ts
echo "Installed deno and denon. Setting up git for deploy"
[ ! -d "./.git" ] && git init && git add . && git commit -m "Initial commit - ready to deploy"