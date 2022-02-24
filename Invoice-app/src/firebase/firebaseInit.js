// import { firebase } from "firebase/app";
//This is the new version of firebase that is version 9 compact (New)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
     apiKey: "AIzaSyAGQAGAqEoeQWyGoX3s6rAydAf4vSBiDKo",
     authDomain: "invoice-app-dc088.firebaseapp.com",
     projectId: "invoice-app-dc088",
     storageBucket: "invoice-app-dc088.appspot.com",
     messagingSenderId: "856170016174",
     appId: "1:856170016174:web:2db618bf51cd3ef5212c3f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();