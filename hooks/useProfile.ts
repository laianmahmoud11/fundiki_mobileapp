import { useState, useEffect, useCallback } from 'react';
import { getUserProfile, updateUserProfile, uploadUserProfileImage } from '@/services/profileService';
import { ProfileUser } from '@/types/profile';
import { Alert } from 'react-native';

export function useProfile() {
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(async (data: Partial<ProfileUser>) => {
    try {
      const updated = await updateUserProfile(data);
      if (updated) {
        setProfile(updated);
      }
      return updated;
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile');
      throw error;
    }
  }, []);

  const uploadImage = useCallback(async (imageUri: string) => {
    try {
      setUploading(true);
      const imageUrl = await uploadUserProfileImage(imageUri);
      await loadProfile();
      return imageUrl;
    } catch (error: any) {
      console.error('Failed to upload image:', error);
      Alert.alert('Error', error.message || 'Failed to upload photo');
      throw error;
    } finally {
      setUploading(false);
    }
  }, [loadProfile]);

  return {
    profile,
    loading,
    uploading,
    setProfile,
    updateProfile,
    uploadImage,
    refetch: loadProfile,
  };
}