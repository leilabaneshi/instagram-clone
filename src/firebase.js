



import firebase from 'firebase';



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDgFn6tmPIOCSKCdDqMn7XauQQw4q-bdX8",
    authDomain: "instagram-clone-react-445dd.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-445dd.firebaseio.com",
    projectId: "instagram-clone-react-445dd",
    storageBucket: "instagram-clone-react-445dd.appspot.com",
    messagingSenderId: "142725776234",
    appId: "1:142725776234:web:43c937465d051e7fad5b13",
    measurementId: "G-MS6898662C"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };