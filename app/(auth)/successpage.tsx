import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 서버로부터 유저 정보를 가져오는 API 호출
    fetch('http://localhost:8080/api/userdata', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        if (data.familyRole === null) {
          // familyRole이 null이면 /userextra로 이동 
          router.replace('/userextra');
        } else {
          // familyRole이 null이 아니면 /main으로 이동
          router.replace('/(main)');
        }
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, [router]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome, {user.name}!</Text> */}
    </View>
  );
}
