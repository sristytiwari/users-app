import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB96TsUW0Z73H4SniIn_dYsM9BOteSqDBY",
  authDomain: "users-de333.firebaseapp.com",
  databaseURL: "https://users-de333.firebaseio.com",
  projectId: "users-de333",
  storageBucket: "users-de333.appspot.com",
  messagingSenderId: "286398250820",
  appId: "1:286398250820:web:914040441abf33ad942111"
};


firebase.initializeApp(firebaseConfig);
export default firebase;
