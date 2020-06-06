import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyB5VthAITWRInD_EyF6uJ76grHg-Qb1Mog',
  authDomain: 'graphql-test-109be.firebaseapp.com',
  // databaseURL: 'https://graphql-test-109be.firebaseio.com',
  projectId: 'graphql-test-109be',
  storageBucket: 'graphql-test-109be.appspot.com',
  // messagingSenderId: '616747098708',
  appId: '1:616747098708:web:4d82ec3a680c349ebf03c1',
  measurementId: 'G-QDWNV4B7QE',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
