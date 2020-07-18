import { Date } from "./schema"
import { addPart, editPart, removePart, partChanged } from "./functions/mutations"
import { getPart, getParts } from "./functions/queries"


const resolverFunctions = {
    Query: {
        getPart,
        getParts,
    },
    Mutation: {
        addPart,
        editPart,
        removePart,
    },
    Subscription: {
        ...partChanged()
    },
    Date,
};


export default resolverFunctions;