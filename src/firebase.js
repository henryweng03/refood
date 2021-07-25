import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBKgQuOYZPC5JL9j3IPS9z4k0wnPRl1bbY",
  authDomain: "refood-e7324.firebaseapp.com",
  databaseURL: "https://refood-e7324-default-rtdb.firebaseio.com",
  projectId: "refood-e7324",
  storageBucket: "refood-e7324.appspot.com",
  messagingSenderId: "175388810147",
  appId: "1:175388810147:web:e0682c64db17217fa9d816",
  measurementId: "G-XMT4B4GG7N",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
