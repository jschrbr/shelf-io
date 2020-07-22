import * as firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./config"



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const streamPart = (id, observer) => {
    return id ? db.collection('parts').doc(id).onSnapshot(observer) : (function data() {
        return {
            name: "Name",
            quantity: 0
        }
    })
};

export const streamParts = (limit, observer) => {
    if (!limit) {
        return db.collection('parts')
            .orderBy('createdAt')
            .onSnapshot(observer);
    }
    else {
        return db.collection('parts').orderBy('createdAt').limit(limit).onSnapshot(observer);
    }
};


export const streamHistory = (limit, id, observer) => {
    if (!limit) {
        return id ? db.collection('parts').doc(id).collection("history").orderBy('updatedAt').onSnapshot(observer) : null
    } else {
        return id ? db.collection('parts').doc(id).collection("history").orderBy('updatedAt', "desc").limit(limit).onSnapshot(observer) : null
    }

};

export const addPart = async (name, quantity) => {
    try {
        const newPart = {
            name,
            quantity,
            id: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const doc = await db.collection('parts').add(newPart);
        return doc.id;
    } catch (err) {
        console.error(err)
        return err
    }
}


export const editPart = async (id, partData) => {
    try {
        partData.updatedAt = new Date().toISOString()
        const part = await db.doc(`/parts/${id}`).get();
        await db.doc(`/parts/${id}`).update(partData)
    } catch (err) {
        console.error(err)
        return err
    }
}


// TODO
// Edit parts MUI autocomplete with freesolo
// 
// Remove MUI autocomplete with tags
// 
// History and updated at