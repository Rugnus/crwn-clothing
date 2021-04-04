import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAte73hP9S_tkAsuj13NDioVtjlXdeRoGU",
    authDomain: "crwn-db-d0dab.firebaseapp.com",
    projectId: "crwn-db-d0dab",
    storageBucket: "crwn-db-d0dab.appspot.com",
    messagingSenderId: "596637204460",
    appId: "1:596637204460:web:ac1596506083bad5900ac9",
    measurementId: "G-NBVQXY3N51"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.error(error);
        }
    }

    return userRef;
} 


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
