// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBdxjHJv2O5-cWylHcsmaqlqzU0qvMI0I",
  authDomain: "umigame-no-soup.firebaseapp.com",
  projectId: "umigame-no-soup",
  storageBucket: "umigame-no-soup.appspot.com",
  messagingSenderId: "696676594661",
  appId: "1:696676594661:web:a119e5ea170bccec22350c",
  measurementId: "G-ESQ6FFB3CD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
