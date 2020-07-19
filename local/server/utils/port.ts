import * as flags from "https://deno.land/std/flags/mod.ts"

const { args, exit } = Deno;
const DEFAULT_PORT = 3000
const argPort = flags.parse(args).port;
const PORT = argPort ? Number(argPort) : DEFAULT_PORT

if (isNaN(PORT)) {
    console.log("port is not a number")
    exit(1)
}

export default PORT