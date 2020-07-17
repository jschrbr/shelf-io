import { db, auth } from '../../middleware/admin'
import { isNewValidUsr, isValidUsr } from '../../utils/validators'

interface Users {
    email: String,
    password: String,
    confirmPassword: String,
    handle: String,
    cred: String
}

interface Parts {
    createdAt: String,
    updatedAt: String,
    name: String,
    quantity: Number,
}

export const signup = async (req: any, res: any) => {
    try {
        const { email, password, confirmPassword, handle } = req.body
        const newUser = {
            email,
            password,
            confirmPassword,
            handle
        } as Users;
        const errors = await isNewValidUsr(newUser);

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }
        const doc = await db.doc(`/users/${handle}`).get();

        if (doc.exists) {
            return res.status(400).json({ handle: `this handle is already taken` });
        }
        const data = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        if (data.user) {
            const userId = data.user.uid;
            const token = await data.user.getIdToken();

            const userCredentials = {
                handle,
                email,
                createdAt: new Date().toISOString(),
                // imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/no-img.png?alt=media`,
                userId,
            };

            await db.doc(`/users/${newUser.handle}`).set(userCredentials);
            return res.status(201).json({ token });
        }
        return res
            .status(500)
            .json({ general: "Something went wrong, please try again." })

    } catch (err) {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
            return res.status(400).json({ message: "Email is already in use" });
        }
        return res
            .status(500)
            .json({ general: "Something went wrong, please try again." });
    }
}

export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body
        const user = {
            email,
            password
        } as Users;
        const errors = await isValidUsr(user);
        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const data = await auth.signInWithEmailAndPassword(
            email,
            password
        );
        if (data.user) {
            const token = await data.user.getIdToken();
            return res.status(201).json({ token });
        }
        return res
            .status(500)
            .json({ general: "Something went wrong, please try again." })

    } catch (err) {
        console.error(err);
        return res
            .status(403)
            .json({ general: "Wrong credentials, please try again" });
    }
}



export const getParts = async (req: any, res: any) => {
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
        return res.json(parts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Something went wrong :S` });
    }
}


export const addParts = async (req: any, res: any) => {
    try {
        // const errors = await isValidUsr(req.body);
        // if (Object.keys(errors).length) {
        //     return res.status(400).json(errors);
        // }
        const { name, quantity } = req.body

        const newPart = {
            name,
            quantity: parseFloat(quantity),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const doc = await db.collection('parts').add(newPart);
        const { id } = doc
        return res.status(201).json({ id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Something went wrong :S` });
    }
}

export const countParts = async (req: any, res: any) => {
    try {
        const { id, quantity } = req.body
        const countPart = {
            updatedAt: new Date().toISOString(),
            quantity: parseFloat(quantity)
        }
        await db.doc(`/parts/${id}`).update(countPart)

        return res.json({ message: "Part count updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Something went wrong :S` });

    }
}


export const removeParts = async (req: any, res: any) => {
    try {
        const { id } = req.body
        await db.doc(`/parts/${id}`).delete()
        return res.json({ message: "Part has been removed" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Something went wrong :S` });

    }
}