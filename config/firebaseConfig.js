import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAzhVmv0f163bcx13YqbsYpXrmHlJsf4e4",
    authDomain: "warningspeed-c9fc5.firebaseapp.com",
    projectId: "warningspeed-c9fc5",
    storageBucket: "warningspeed-c9fc5.appspot.com",
    messagingSenderId: "426740993750",
    appId: "1:426740993750:web:1555353e3a6300cf18c377",
    measurementId: "G-CPC1SF6CMM"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};