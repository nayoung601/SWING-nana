// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// export default function FamilyLink({ userId }) {
//   const [familyCode, setFamilyCode] = useState(null); // 가족 코드 상태
//   const [isLinked, setIsLinked] = useState(false); // 가족 연동 여부 상태

//   const fetchFamilyLink = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/family/link/${userId}`, {
//         method: 'GET',
//         credentials: 'include',
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setFamilyCode(data.familyCode); // 가족 코드 설정
//         setIsLinked(!!data.familyCode); // 가족 연동 여부 설정
//       } else {
//         console.error('Failed to fetch family link data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching family link data:', error);
//     }
//   };

//   const handleGenerateCode = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/family/generate/${userId}`, {
//         method: 'POST',
//         credentials: 'include',
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setFamilyCode(data.familyCode); // 새 가족 코드 설정
//         setIsLinked(true); // 가족 연동 상태로 전환
//       } else {
//         console.error('Failed to generate family code:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error generating family code:', error);
//     }
//   };

//   const handleLeaveFamily = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/family/leave/${userId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (response.ok) {
//         setFamilyCode(null); // 가족 코드 초기화
//         setIsLinked(false); // 가족 연동 해제
//       } else {
//         console.error('Failed to leave family:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error leaving family:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFamilyLink();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>가족 연동</Text>
//       {isLinked ? (
//         <View style={styles.linkedContainer}>
//           <Text style={styles.codeText}>{familyCode}</Text>
//           <TouchableOpacity style={styles.button} onPress={handleLeaveFamily}>
//             <Text style={styles.buttonText}>가족 탈퇴하기</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.unlinkedContainer}>
//           <Text style={styles.infoText}>연동된 가족 없음</Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={handleGenerateCode}>
//               <Text style={styles.buttonText}>가족 코드 발급</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button}>
//               <Text style={styles.buttonText}>가족 연동하기</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     width: '95%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   linkedContainer: {
//     alignItems: 'center',
//   },
//   unlinkedContainer: {
//     alignItems: 'center',
//   },
//   codeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#777',
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   button: {
//     backgroundColor: '#AFB8DA',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
