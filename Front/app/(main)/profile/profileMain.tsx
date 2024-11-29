import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserData } from '../../../context/UserDataContext';
import { useRouter } from 'expo-router';


export default function ProfileMain() {
  const navigation = useNavigation();
  const { user, logout } = useUserData();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // UserDataContext에서 제공하는 logout 함수 호출
    router.replace('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <View style={styles.container}>
        <View style={styles.profileCard}>
            <Text style={styles.nameText}>
                {user.name} <Text style={styles.familyRoleText}>({user.familyRole})</Text>
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('UserInfo')}
            >
                <View style={styles.buttonContent}>
                    <Image
                    source={require('../../../assets/images/userinfo.png')} // 왼쪽 아이콘
                    style={styles.leftIcon}
                    />
                    <Text style={styles.buttonText}>내 정보</Text>
                </View>
                <Image
                    source={require('../../../assets/images/next.png')} // 오른쪽 아이콘
                    style={styles.rightIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('NotificationSettings')}
            >
                <View style={styles.buttonContent}>
                    <Image
                    source={require('../../../assets/images/setnotify.png')} // 왼쪽 아이콘
                    style={styles.leftIcon}
                    />
                    <Text style={styles.buttonText}>알림 설정</Text>
                </View>
                <Image
                    source={require('../../../assets/images/next.png')} // 오른쪽 아이콘
                    style={styles.rightIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FamilyLink')}
            >
                <View style={styles.buttonContent}>
                    <Image
                    source={require('../../../assets/images/familylink.png')} // 왼쪽 아이콘
                    style={styles.leftIcon}
                    />
                    <Text style={styles.buttonText}>가족 연동</Text>
                </View>
                <Image
                    source={require('../../../assets/images/next.png')} // 오른쪽 아이콘
                    style={styles.rightIcon}
                />
            </TouchableOpacity>

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
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    padding: 10,
    marginTop: 15,
  },
  profileCard: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 5,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: '#fff', 
    paddingVertical: 15, 
    paddingHorizontal: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0', 
  },
  buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold', marginLeft: 8, },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  familyRoleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
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
  leftIcon: {
    width: 24, // 왼쪽 아이콘 크기
    height: 24,
  },
  rightIcon: {
    width: 16, // 오른쪽 화살표 아이콘 크기
    height: 16,
  },
  buttonContent: {
    flexDirection: 'row', // 왼쪽 아이콘과 텍스트를 가로로 정렬
    alignItems: 'center',
  },
});
