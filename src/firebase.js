// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBI5-fxXNNktdGV2Z_CDl4oYLnuKuAP7LM',
  authDomain: 'film-city-6d3c6.firebaseapp.com',
  projectId: 'film-city-6d3c6',
  storageBucket: 'film-city-6d3c6.appspot.com',
  messagingSenderId: '539496160153',
  appId: '1:539496160153:web:22721ba4cd178e6f811108',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
