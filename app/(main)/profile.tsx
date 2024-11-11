// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Profile() {
//   const [userName, setUserName] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const loadUserName = async () => {
//       const name = await AsyncStorage.getItem('userName');
//       setUserName(name);
//     };

//     loadUserName();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.clear(); // AsyncStorage의 모든 데이터를 비움
//     router.replace('/login');   // 로그인 페이지로 리디렉트
//   };

//   if (!userName) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileCard}>
//         <Text style={styles.nameText}>{userName}</Text>
//       </View>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>로그아웃</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f4ff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileCard: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     alignItems: 'center',
//   },
//   nameText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   logoutButton: {
//     marginTop: 20,
//     backgroundColor: '#ff8566',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//   },
//   logoutButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   loadingText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserData } from '../../context/UserDataContext';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useUserData();

  const handleLogout = async () => {
    await logout();           // UserDataContext에서 제공하는 logout 함수 호출
    router.replace('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.nameText}>{user.name}</Text>
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
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
});
