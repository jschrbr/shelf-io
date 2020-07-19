import { db } from '../../middleware/admin'

interface Parts {
    createdAt: String,
    updatedAt: String,
    name: String,
    quantity: Number,
    id: String
}


export const getPart = async (_: any, { id }: { id: string }) => {
    const part = await db.doc(`/parts/${id}`).get()
    return part.data()
}
export const getParts = async () => {
    try {
        const data = await db
            .collection("parts")
            .orderBy("createdAt")
            .get();
        const parts: Parts[] = []
        data.forEach((doc) => {
            const part: any = doc.data();
            part.partId = doc.id;
            parts.push(part);
        });
        return parts;
    } catch (err) {
        console.error(err);
        return err
    }

}
