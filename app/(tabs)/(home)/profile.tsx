import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebaseconfig';
import { signOutUser } from '@/services/profileService';
import { useProfile } from '@/hooks/useProfile';
import GuestProfile from '@/components/profile/GuestProfile';
import LoggedInProfile from '@/components/profile/LoggedInProfile';

export default function ProfileScreen() {
  const { profile, loading, uploading, setProfile, uploadImage, refetch } = useProfile();
  const [user, setUser] = useState(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        await refetch();
      }
      
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        refetch();
      }
    }, [user, refetch])
  );

  async function handleSignOut() {
    await signOutUser();
    setUser(null);
    setProfile(null);
  }

  function handleSignIn() {
    router.push('/auth/signInOptionsScreen');
  }

  if (authLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4' }}>
        <ActivityIndicator size="large" color="#006CE4" />
      </View>
    );
  }

  return user && profile ? (
    <LoggedInProfile
      profile={profile}
      setProfile={setProfile}
      uploadImage={uploadImage}
      uploading={uploading}
      onSignOut={handleSignOut}
    />
  ) : (
    <GuestProfile onSignIn={handleSignIn} />
  );
}