import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyC46WAWFxU6aiep0P6KtdrCZdN5Ss3seUs",
    authDomain: "crwn-clothing-db-5c4fb.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-5c4fb.firebaseio.com",
    projectId: "crwn-clothing-db-5c4fb",
    storageBucket: "",
    messagingSenderId: "827172977256",
    appId: "1:827172977256:web:d5223745a26402d8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;