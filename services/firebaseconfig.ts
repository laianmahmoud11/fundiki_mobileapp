import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence, Auth, signOut } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD3AUCx-EFiu1m2IyHGwgg2knqJL-Sxqb8",
  authDomain: "fundiki-app.firebaseapp.com",
  projectId: "fundiki-app",
  storageBucket: "fundiki-app.firebasestorage.app",
  messagingSenderId: "955412175085",
  appId: "1:955412175085:web:c073a6ef8f407b6368d4e4"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch {
  auth = getAuth(app);
}

auth.onAuthStateChanged((user) => {
  if (user && user.isAnonymous) {
    signOut(auth).catch(console.error);
  }
});

const db: Firestore = getFirestore(app);

export { app, auth, db };
export default app;