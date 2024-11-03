// import React, { useContext } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import UserContext from '@/context/UserContext';

// export default function Profile() {
//   const { user, clearUser } = useContext(UserContext);
//   const router = useRouter();

//   const handleLogout = async () => {
//     await clearUser();  // AsyncStorage와 Context의 유저 정보를 비움
//     router.replace('/');  // (auth)/login으로 리디렉션
//   };

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* 프로필 정보 표시하는 카드 */}
//       {/* <View style={styles.profileCard}>
//         <Text style={styles.nameText}>{user.name}</Text>
//         <View style={styles.familyRoleContainer}>
//           <Text style={styles.familyRole}>{user.family_role}</Text>
//         </View>

//         {/* 연락처 및 추가 정보 */}
//         <View style={styles.infoContainer}>
//           <Text style={styles.label}>전화번호</Text>
//           <Text style={styles.infoText}>{user.phone_number}</Text>
//         </View>
//         <View style={styles.infoContainer}>
//           <Text style={styles.label}>E-mail</Text>
//           <Text style={styles.infoText}>{user.email}</Text>
//         </View>
//         <View style={styles.infoContainer}>
//           <Text style={styles.label}>나이</Text>
//           <Text style={styles.infoText}>{user.age}세</Text>
//         </View>
//       </View> */}

//       {/* 로그아웃 버튼 */}
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
//   },
//   nameText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   familyRoleContainer: {
//     backgroundColor: '#e5ffb3',
//     borderRadius: 15,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//   },
//   familyRole: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#6b8e23',
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     color: '#808080',
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: '500',
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

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserName = async () => {
      const name = await AsyncStorage.getItem('userName');
      setUserName(name);
    };

    loadUserName();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear(); // AsyncStorage의 모든 데이터를 비움
    router.replace('/login');   // 로그인 페이지로 리디렉트
  };

  if (!userName) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.nameText}>{userName}</Text>
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
