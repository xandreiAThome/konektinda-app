import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import { browserLocalPersistence } from 'firebase/auth/web-extension';

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

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

export { app, auth, getAuth };

// for proper auth persistance
// const app = initializeApp(firebaseConfig);

// // Get auth instance
// // Firebase automatically uses persistent storage by default
// const auth = getAuth(app);

// export { app, auth, getAuth };
