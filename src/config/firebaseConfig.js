// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKRO1SrPKFIeiUg5yNNdkdYzbv_IsCYfU",
  authDomain: "bangi-ai.firebaseapp.com",
  projectId: "bangi-ai",
  storageBucket: "bangi-ai.appspot.com",
  messagingSenderId: "791482455634",
  appId: "1:791482455634:web:953139eb293e8f10be718b",
  measurementId: "G-064Q08YFEQ"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

module.exports = firebase;
module.exports = analytics;
