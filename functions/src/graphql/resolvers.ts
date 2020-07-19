import { Date } from "./schema"
import { addPart, editPart, removePart } from "./functions/mutations"
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
    Date,
};


export default resolverFunctions;