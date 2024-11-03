import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        console.log("AsyncStorage userName:", userName); // 확인용 로그

        if (userName) {
          router.replace('/(main)'); // 로그인된 상태면 메인 페이지로 이동
        } else {
          router.replace('/login'); // 로그인되지 않은 상태면 로그인 페이지로 이동
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        router.replace('/login'); // 오류 시 로그인 페이지로 이동
      }
    };

    checkLoginStatus();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
}
