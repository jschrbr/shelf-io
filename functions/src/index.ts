import * as functions from 'firebase-functions';
import { db } from "./middleware/admin"

import graphQL from './graphql';

const server = graphQL();


exports.graphql = functions.https.onRequest(server)

exports.partAdjustment = functions.firestore.document('/parts/{id}').onWrite(
    async (change: any, context) => {
        const { id } = context.params
        const { quantity, updatedAt } = change.after.data()
        if (change.after.data().id !== id) {
            await db.doc(`/parts/${id}`).update({ id })
            await db.doc(`/parts/${id}`).collection('history').add({ quantity, updatedAt })
        }
        else if (change.before.data().quantity !== quantity) {
            await db.doc(`/parts/${id}`).collection('history').add({ quantity, updatedAt })
        }
    }
)