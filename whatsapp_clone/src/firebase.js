// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDh0jDjhosjBUEO6y1doAhLqWbxeGVL0Tw",
    authDomain: "whatsapp-clone-e3384.firebaseapp.com",
    projectId: "whatsapp-clone-e3384",
    storageBucket: "whatsapp-clone-e3384.appspot.com",
    messagingSenderId: "402346173429",
    appId: "1:402346173429:web:e32628b056e95ba84fb6bc",
    measurementId: "G-VCLFBR99JT"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;