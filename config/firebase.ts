import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import {
  browserLocalPersistence, // <-- The special web part
} from 'firebase/auth/web-extension';

// 1. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_AUTH_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_AUTH_PROJECT_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_AUTH_APP_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_AUTH_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_AUTH_MESSAGING_SENDER_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_AUTH_MEASUREMENT_ID,
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. Initialize Auth and set persistence
// This is the key. It tells Firebase to use AsyncStorage
// to store the user's session.
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

// 4. Export the services you need
export { app, auth, getAuth };
