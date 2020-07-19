import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts";

import { types } from "./types.ts"
import { resolvers } from "./resolvers.ts"

export const graphQL = await applyGraphQL({
    typeDefs: types,
    resolvers: resolvers,
})

export default graphQL
