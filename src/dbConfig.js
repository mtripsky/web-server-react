import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBfF3HeCnQeazJZ_WLmRCRj3vsztxI1jX4",
  authDomain: "weather-station-etterbeek.firebaseapp.com",
  databaseURL: "https://weather-station-etterbeek.firebaseio.com",
  projectId: "weather-station-etterbeek",
  storageBucket: "weather-station-etterbeek.appspot.com",
  messagingSenderId: "607055953752",
  appId: "1:607055953752:web:2a90446c263407dca7ef2d",
  measurementId: "G-ZTYXL3NJZX"
};

const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
//const firebase = require('firebase');
//const functions = require('firebase-functions');

//firebase.initializeApp(functions.config(firebaseConfig).firebase);

//const db = app.firestore();

export default db;