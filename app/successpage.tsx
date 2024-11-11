// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function SuccessPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // 사용자 정보를 서버에서 가져오는 API 호출
//         const response = await fetch('http://localhost:8080/api/userdata', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await response.json();

//         console.log('Fetched data:', data);

//         // 사용자 정보가 있을 경우, 이름을 AsyncStorage에 저장
//         if (data.name) {
//           await AsyncStorage.setItem('userName', data.name);
//         }

//         // family_role이 null인지 확인 후 경로 설정
//         if (data.familyRole === null) {
//           router.replace('/userextra');
//         } else {
//           router.replace('/(main)');
//         }
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//         // 오류 발생 시 로그인 화면으로 리다이렉트
//         router.replace('/login');
//       }
//     };

//     fetchUserData();
//   }, [router]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Loading...</Text>
//     </View>
//   );
// }

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserData } from '../context/UserDataContext';

export default function SuccessPage() {
  const router = useRouter();
  const { updateUser } = useUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 사용자 정보를 서버에서 가져오는 API 호출
        const response = await fetch('http://localhost:8080/api/userdata', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        // 사용자 정보 업데이트
        if (data.name) {
          await updateUser({ name: data.name, familyRole: data.familyRole });
        }

        // family_role에 따라 페이지 라우팅
        if (data.familyRole === null) {
          router.replace('/userextra');
        } else {
          router.replace('/(main)');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        router.replace('/login');
      }
    };

    fetchUserData();
  }, [router, updateUser]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Loading...</Text>
    </View>
  );
}
