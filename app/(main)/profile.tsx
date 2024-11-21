import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserData } from '../../context/UserDataContext';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useUserData();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/mypage/update/${userId}`, {
        method: 'GET',
        credentials: 'include', // 쿠키 포함
      });
      if (response.ok) {
        const data = await response.json(); // JSON 파싱
        setUserData(data); // 성공적으로 가져온 데이터 저장
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    if (user && user.userId) {
      fetchUserData(user.userId); // userContext에서 userId를 가져와 API 호출
    }
  }, [user]);

  const handleLogout = async () => {
    await logout(); // UserDataContext에서 제공하는 logout 함수 호출
    router.replace('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  if (!user || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>사용자 데이터를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.nameText}>
          {user.name} <Text style={styles.familyRoleText}>({userData.familyRole})</Text>
        </Text>
        <Text style={styles.infoText}>전화번호: {userData.phoneNumber}</Text>
        <Text style={styles.infoText}>성별: {userData.gender}</Text>
        <Text style={styles.infoText}>나이: {userData.age}세</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  familyRoleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff8566',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});
