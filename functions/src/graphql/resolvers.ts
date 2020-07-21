import { Date } from "./schema"
import { addPart, editPart } from "./functions/mutations"
import { getPart, getParts } from "./functions/queries"


const resolverFunctions = {
    Query: {
        getPart,
        getParts,
    },
    Mutation: {
        addPart,
        editPart,
    },
    Date,
};


export default resolverFunctions;