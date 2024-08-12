import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey:"AIzaSyDmv-pschZ8y60FRUzZwBlnjdZU4zVTjPA",
    authDomain: "form-15380.firebaseapp.com",
    projectId: "form-15380",
    storageBucket: "form-15380.appspot.com",
    messagingSenderId:  "1086092985316",
    appId: "1:1086092985316:web:953fd98772bdbd5266bdf1",
    measurementId:"G-WXFCTQ1T11"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


// apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID