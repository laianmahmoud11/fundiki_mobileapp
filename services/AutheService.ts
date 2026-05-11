import StorageService from "@/services/StorageService";
import { AppUser } from "@/types/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getCurrentUserFromFirebase } from './firebase/firebaseAuthSource';
import { auth } from './firebaseconfig';

const initAuth = () => {
  return auth;
};

type AuthPayload = {
  email: string;
  password: string;
};

export const loginOrSignup = async ({ email, password }: AuthPayload) => {
  const auth = initAuth();

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const result = await signInWithEmailAndPassword(
      auth,
      normalizedEmail,
      password,
    );

    await StorageService.saveUser(result.user);
    await StorageService.saveToken(await result.user.getIdToken());

    return result.user;
  } catch (signInError: any) {
    if (
      signInError?.code === "auth/user-not-found" ||
      signInError?.code === "auth/invalid-credential"
    ) {
      const result = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password,
      );

      await StorageService.saveUser(result.user);
      await StorageService.saveToken(await result.user.getIdToken());

      return result.user;
    }
    throw signInError;
  }
};

export async function getCurrentUser(): Promise<AppUser | null> {
  return getCurrentUserFromFirebase();
}