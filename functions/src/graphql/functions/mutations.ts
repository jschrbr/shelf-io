import { db } from '../../middleware/admin'
import { PubSub } from 'graphql-subscriptions'
import { addInput, editInput, removeInput } from '../../utils/interfaces'

const pubsub = new PubSub();

const PART_CHANGE = 'PART_CHANGE';

export const addPart = async (_: any, { input: { name, quantity } }: { input: addInput }) => {
    try {
        const newPart = {
            name,
            quantity,
            id: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const doc = await db.collection('parts').add(newPart);
        newPart.id = doc.id
        await db.doc(`/parts/${doc.id}`).update(newPart)

        return {
            done: true,
        };
    } catch (err) {
        console.error(err)
        return err
    }
}

export const partChanged = () => {
    return {
        partChanged: {
            subscribe: () => pubsub.asyncIterator([PART_CHANGE])
        }
    }
}

export const editPart = async (_: any, { input: { id, quantity } }: { input: editInput }) => {
    try {
        const countPart = {
            updatedAt: new Date().toISOString(),
            quantity
        }
        await db.doc(`/parts/${id}`).update(countPart)
        return {
            done: true,
        };
    } catch (err) {
        console.error(err)
        return err
    }
}

export const removePart = async (_: any, { input: { id } }: { input: removeInput }) => {
    try {
        await db.doc(`/parts/${id}`).delete()
        return {
            done: true,
        };
    } catch (err) {
        console.error(err)
        return err
    }
}