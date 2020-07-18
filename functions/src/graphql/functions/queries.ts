import { db } from '../../middleware/admin'

interface Parts {
    createdAt: String,
    updatedAt: String,
    name: String,
    quantity: Number,
}


export const getPart = async (_: any, { id }: { id: number }) => {
    const part = await db.doc(`/parts/${id}`).get()
    return part
}
export const getParts = async () => {
    try {
        const data = await db
            .collection("parts")
            .orderBy("updatedAt", "desc")
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
