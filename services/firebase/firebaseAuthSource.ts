import { AppUser } from '../../types/user';
import { auth } from '../firebaseconfig';

export async function getCurrentUserFromFirebase(): Promise<AppUser | null> {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  return {
    id: user.uid,
    name: user.displayName ?? '',
    email: user.email ?? '',
  };
}