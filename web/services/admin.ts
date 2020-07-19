import * as firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./config"



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};


// export const streamParts = (observer) => {
//     return db.collection('parts')
//         .orderBy('createdAt')
//         .limit(3)
//         .onSnapshot(observer);
// };

export const streamParts = (observer) => {
    return db.collection('parts')
        .orderBy('createdAt')
        .onSnapshot(observer);
};

export const getParts = () => {
    return db.collection('parts').get();
};