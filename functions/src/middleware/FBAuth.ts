import admin, { db } from "./admin";


export const FBAuth = async (req: any, res: any, next: any) => {
    try {
        let idToken;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            idToken = req.headers.authorization.split("Bearer ")[1];
        } else {
            console.error("No token found");
            return res.status(403).json({ error: "Unauthorizes" });
        }
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        req.user = decodedToken;

        const data = await db
            .collection("users")
            .where("userId", "==", req.user.uid)
            .get();

        req.user.handle = data.docs[0].data().handle;
        req.user.imageUrl = data.docs[0].data().imageUrl;
        next();
        return
    } catch (err) {
        console.error(err);
        return res.status(403).json(err);
    }
}