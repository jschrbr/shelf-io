import * as admin from "firebase-admin";
import * as firebase from "firebase"
import { firebaseConfig } from "./config"

admin.initializeApp();
export const db = admin.firestore();

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default admin