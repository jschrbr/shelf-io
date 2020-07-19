// import { Join, Where } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import { partModel } from "../models/models.ts"
import { Date } from "./types.ts"
import { addPart, editPart, removePart, partChanged } from "./functions/mutations.ts"
import { getPart, getParts } from "./functions/queries.ts"

const parts: any = await partModel.findAll({ fields: ["*"] });

export const resolvers = {
    Query: {
        ...getPart(parts),
        ...getParts(parts)
    },
    Mutation: {
        ...addPart(parts),
        ...editPart(parts),
        ...removePart(parts),
    },
    Subscription: {
        ...partChanged()
    },
    Date,
};