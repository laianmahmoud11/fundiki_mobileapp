import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3AUCx-EFiu1m2IyHGwgg2knqJL-Sxqb8",
  authDomain: "fundiki-app.firebaseapp.com",
  projectId: "fundiki-app",
  storageBucket: "fundiki-app.firebasestorage.app",
  messagingSenderId: "955412175085",
  appId: "1:955412175085:web:c073a6ef8f407b6368d4e4"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

let authInitPromise: Promise<void>;
export function ensureAuthInitialized(): Promise<void> {
  if (!authInitPromise) {
    authInitPromise = signInAnonymously(auth)
      .then(() => {
        console.log('Anonymous auth initialized');
      })
      .catch((err) => {
        console.error('Anonymous auth failed - enable Anonymous sign-in in Firebase Console:', err);
      });
  }
  return authInitPromise;
}

ensureAuthInitialized();

export { app, auth, db };
export default app;