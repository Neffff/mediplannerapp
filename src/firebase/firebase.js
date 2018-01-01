
  import * as firebase from 'firebase';
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqWxvawqPmMQaKdN59UZ8T_gQ_wrdllFI",
    authDomain: "mediplannerapp.firebaseapp.com",
    databaseURL: "https://mediplannerapp.firebaseio.com",
    projectId: "mediplannerapp",
    storageBucket: "mediplannerapp.appspot.com",
    messagingSenderId: "504913717213"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};