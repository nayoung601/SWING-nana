import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserData } from '../context/UserDataContext';

export default function Index() {
  const router = useRouter();
  const { user, isLoading } = useUserData();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/(main)'); // 로그인된 상태면 메인 페이지로 이동
      } else {
        router.replace('/login'); // 로그인되지 않은 상태면 로그인 페이지로 이동
      }
    }
  }, [isLoading, user, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
}
