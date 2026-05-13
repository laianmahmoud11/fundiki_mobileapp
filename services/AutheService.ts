import { AppUser } from '@/types/user';
import { auth} from './firebaseconfig';
import StorageService  from './StorageService';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

const mapFirebaseUserToAppUser = (firebaseUser: any): AppUser => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName ?? '',
  email: firebaseUser.email ?? '',
});

export const login = async (payload: { email: string; password: string }): Promise<AppUser> => {
  const response = await signInWithEmailAndPassword(
    auth, 
    payload.email.trim().toLowerCase(), 
    payload.password
  );
  
  const user = response.user;
  const token = await user.getIdToken();
  
  await Promise.all([
    StorageService.saveToken(token),
    StorageService.saveUser(mapFirebaseUserToAppUser(user))
  ]);
  
  return mapFirebaseUserToAppUser(user);
};

export const signup = async (payload: { email: string; password: string }): Promise<AppUser> => {
  const response = await createUserWithEmailAndPassword(
    auth, 
    payload.email.trim().toLowerCase(), 
    payload.password
  );
  
  const user = response.user;
  const token = await user.getIdToken();
  
  await Promise.all([
    StorageService.saveToken(token),
    StorageService.saveUser(mapFirebaseUserToAppUser(user))
  ]);
  
  return mapFirebaseUserToAppUser(user);
};

export const logout = async (): Promise<void> => {
  await auth.signOut();
  
  await StorageService.clearAsyncStorage
  
  router.replace('./(auth)/signInOptionsScreen');
};