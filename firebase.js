import { initializeApp } from 'firebase/app';


// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'makanwell-b8c98.firebaseapp.com',
  databaseURL: 'https://makanwell-b8c98-default-rtdb.firebaseio.com/',
  projectId: "makanwell-b8c98",
  storageBucket: 'makanwell-b8c98.appspot.com',
  messagingSenderId: '335825813383',
  appId: '1:335825813383:web:159ac6100cf726bb1c1d22',
  measurementId: 'G-4W9JN1KEDJ',
};

const app = initializeApp(firebaseConfig);

export default { app };
