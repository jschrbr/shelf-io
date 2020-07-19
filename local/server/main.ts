import {
  Application,
} from './deps.ts';

import graphQL from "./graphql/graphql.ts"
import PORT from "./utils/port.ts"
import { reactSSR } from "./app/index.tsx"

const app = new Application()

app.use(graphQL.routes());
app.use(graphQL.allowedMethods());
app.use(reactSSR.routes())
app.use(reactSSR.allowedMethods())


console.log(`http://localhost:${PORT}/graphql`)
console.log(`http://localhost:${PORT}/ssr`)

await app.listen({ port: PORT })



