import { Where } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import { partModel, Part, addInput, editInput, removeInput } from "../../models/models.ts"
import { checkId } from "../../utils/validators.ts"
import { PubSub } from "https://deno.land/x/oak_graphql/mod.ts";

const pubsub = new PubSub();

const PART_CHANGE = 'PART_CHANGE';

export const addPart = (parts: any) => {
    return {
        addPart: async (_: any, { input: { name, quantity } }: { input: addInput }) => {
            const insertId = await partModel.insert({
                name,
                quantity
            });
            const part = await partModel.findById(Number(insertId)) as Part;
            parts.push(part);

            return {
                done: true,
            };
        },
    }
}

export const partChanged = () => {
    return {
        partChanged: {
            subscribe: () => pubsub.asyncIterator([PART_CHANGE])
        }
    }
}

export const editPart = (parts: any) => {
    return {
        editPart: async (_: any, { input: { id, quantity } }: { input: editInput }) => {
            const part = checkId(parts, id)
            await partModel.update({ quantity }, Where.from({ id }));
            parts.forEach((part: any, index: number) => {
                if (part.id === Number(id)) {
                    parts[index].quantity = quantity
                }
            });
            pubsub.publish(PART_CHANGE, { partChanged: part })
            return {
                done: true,
            };
        }
    }

}
export const removePart = (parts: any) => {
    return {
        removePart: async (_: any, { input: { id } }: { input: removeInput }) => {
            checkId(parts, id)
            await partModel.delete(Where.from({ id }));
            parts.forEach((part: any, index: number) => {
                if (part.id === Number(id)) {
                    parts.splice(index, 1)
                }
            });

            return {
                done: true,
            };
        }
    }
}


