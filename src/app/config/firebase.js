import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCZZO_rGtHANzFD31hgwFN8MFt5Pg5QTV0",
    authDomain: "studiumappdemo.firebaseapp.com",
    projectId: "studiumappdemo",
    storageBucket: "studiumappdemo.appspot.com",
    messagingSenderId: "286060984529",
    appId: "1:286060984529:web:cb83b9ff78b9004285adf0"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;