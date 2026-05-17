import { doc, getDoc, setDoc, updateDoc, collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/services/firebaseconfig';
import { ProfileUser, SavedHotel } from '@/types/profile';
import { Booking } from '@/types/booking';

export async function getUserProfile(): Promise<ProfileUser | null> {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const newProfile: ProfileUser = {
        id: user.uid,
        email: user.email ?? '',
        name: user.displayName ?? '',
        firstName: '',
        lastName: '',
        phone: '',
        image: '',
        completedProfile: false,
        preferredCity: '',
        roomType: '',
        bedType: '',
        paymentMethod: '',
        specialRequests: '',
        credits: 0,
        rewardPoints: 0,
      };
      await setDoc(userRef, newProfile);
      return newProfile;
    }

    const data = snapshot.data();
    return {
      id: snapshot.id,
      email: data.email ?? '',
      name: data.name ?? '',
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      phone: data.phone ?? '',
      image: data.image ?? '',
      completedProfile: data.completedProfile ?? false,
      preferredCity: data.preferredCity ?? '',
      roomType: data.roomType ?? '',
      bedType: data.bedType ?? '',
      paymentMethod: data.paymentMethod ?? '',
      specialRequests: data.specialRequests ?? '',
      credits: data.credits ?? 0,
      rewardPoints: data.rewardPoints ?? 0,
    };
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

export async function updateUserProfile(data: Partial<ProfileUser>): Promise<ProfileUser | null> {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, data);
    
    return await getUserProfile();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

export async function uploadUserProfileImage(imageUri: string): Promise<string> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const base64 = base64data.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const base64 = await base64Promise;

    const formData = new FormData();
    formData.append('key', '45d9985bd0d55e29521b8d94c250a9a1');
    formData.append('image', base64);

    const uploadResponse = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    if (!uploadData.success) {
      throw new Error('Failed to upload image');
    }

    const imageUrl = uploadData.data.url;

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { image: imageUrl });

    return imageUrl;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
}

export async function getSavedHotels(): Promise<SavedHotel[]> {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const savedRef = collection(db, 'users', user.uid, 'savedHotels');
    const snapshot = await getDocs(savedRef);
    
    const hotelIds = snapshot.docs.map(d => d.data().hotelId);
    
    if (hotelIds.length === 0) return [];
    
    const hotels: SavedHotel[] = [];
    
    for (const hotelId of hotelIds) {
      const hotelRef = doc(db, 'hotels', hotelId);
      const hotelSnap = await getDoc(hotelRef);
      
      if (hotelSnap.exists()) {
        const data = hotelSnap.data();
        hotels.push({
          id: hotelSnap.id,
          name: data.name ?? '',
          city: data.city ?? '',
          country: data.country ?? '',
          image: data.image ?? '',
          pricePerNight: data.pricePerNight ?? data.price ?? 0,
          price: data.price ?? data.pricePerNight ?? 0,
          rating: data.rating ?? 0,
          savedAt: snapshot.docs.find(d => d.data().hotelId === hotelId)?.data().savedAt,
        });
      }
    }
    
    return hotels;
  } catch (error) {
    console.error('Error getting saved hotels:', error);
    return [];
  }
}

export async function saveHotel(hotelId: string): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');

    const savedRef = collection(db, 'users', user.uid, 'savedHotels');
    await addDoc(savedRef, {
      hotelId,
      savedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving hotel:', error);
    throw error;
  }
}

export async function unsaveHotel(hotelId: string): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');

    const savedRef = collection(db, 'users', user.uid, 'savedHotels');
    const q = query(savedRef, where('hotelId', '==', hotelId));
    const snapshot = await getDocs(q);
    
    for (const docSnap of snapshot.docs) {
      await deleteDoc(doc(db, 'users', user.uid, 'savedHotels', docSnap.id));
    }
  } catch (error) {
    console.error('Error unsaving hotel:', error);
    throw error;
  }
}

export async function isHotelSaved(hotelId: string): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const savedRef = collection(db, 'users', user.uid, 'savedHotels');
    const q = query(savedRef, where('hotelId', '==', hotelId));
    const snapshot = await getDocs(q);
    
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking saved hotel:', error);
    return false;
  }
}

export async function getMyActiveBookings(): Promise<Booking[]> {
  try {
    const user = auth.currentUser;
    if (!user) return [];
    
    const bookingsRef = collection(db, 'bookings');
    const activeQuery = query(
      bookingsRef,
      where('userId', '==', user.uid),
      where('status', 'in', ['pending', 'confirmed', 'active'])
    );
    
    const snapshot = await getDocs(activeQuery);
    
    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId ?? '',
        hotelId: data.hotelId ?? '',
        hotelName: data.hotelName ?? '',
        city: data.city ?? '',
        image: data.image ?? '',
        checkIn: data.checkIn ?? '',
        checkOut: data.checkOut ?? '',
        nights: data.nights ?? 0,
        rooms: data.rooms ?? 1,
        guests: data.guests ?? 1,
        roomType: data.roomType ?? '',
        status: data.status ?? 'pending',
        paymentStatus: data.paymentStatus ?? '',
        paymentWay: data.paymentWay ?? '',
        totalPrice: data.totalPrice ?? '',
        createdAt: data.createdAt ?? '',
      };
    });
  } catch (error) {
    console.error('Error getting active bookings:', error);
    return [];
  }
}

export async function getMyPastBookings(): Promise<Booking[]> {
  try {
    const user = auth.currentUser;
    if (!user) return [];
    
    const bookingsRef = collection(db, 'bookings');
    const pastQuery = query(
      bookingsRef,
      where('userId', '==', user.uid),
      where('status', 'in', ['completed', 'cancelled'])
    );
    
    const snapshot = await getDocs(pastQuery);
    
    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId ?? '',
        hotelId: data.hotelId ?? '',
        hotelName: data.hotelName ?? '',
        city: data.city ?? '',
        image: data.image ?? '',
        checkIn: data.checkIn ?? '',
        checkOut: data.checkOut ?? '',
        nights: data.nights ?? 0,
        rooms: data.rooms ?? 1,
        guests: data.guests ?? 1,
        roomType: data.roomType ?? '',
        status: data.status ?? 'pending',
        paymentStatus: data.paymentStatus ?? '',
        paymentWay: data.paymentWay ?? '',
        totalPrice: data.totalPrice ?? '',
        createdAt: data.createdAt ?? '',
      };
    });
  } catch (error) {
    console.error('Error getting past bookings:', error);
    return [];
  }
}

export function getCurrentUser(): ProfileUser | null {
  const user = auth.currentUser;

  if (!user) return null;

  return {
    id: user.uid,
    email: user.email ?? '',
    name: user.displayName ?? '',
  };
}

export async function signOutUser(): Promise<void> {
  await auth.signOut();
}
