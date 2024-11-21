// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MedicationList from '@/components/MedicationList';
// import RewardPoints from '@/components/RewardPoint';
// import { useUserData } from '@/context/UserDataContext';
// import dayjs from 'dayjs';
// import { useFamilyContext } from '@/context/FamilyContext';

// export default function HomeScreen({ navigation }) {
//     const { user } = useUserData();
//     const today = dayjs().format('YYYY-MM-DD'); // 오늘 날짜를 계산
//     const { familyMembers, selectedFamily } = useFamilyContext();

//     // AsyncStorage 로그 확인 (디버깅 용도)
//     AsyncStorage.getAllKeys().then((keys) => {
//         AsyncStorage.multiGet(keys).then((result) => {
//             console.log('AsyncStorage contents:', result);
//         });
//     });

//     React.useEffect(() => {
//         console.log('Family members from context:', familyMembers);
//         console.log('Selected family from context:', selectedFamily);
//     }, [familyMembers, selectedFamily]);

//     return (
//         <View style={styles.container}>
//             {user && user.userId ? (
//                 <MedicationList userId={user.userId} selectedDate={today} />
//             ) : (
//                 <View style={styles.errorContainer}>
//                     <Text style={styles.errorText}>유저 정보를 불러오는 중입니다.</Text>
//                 </View>
//             )}
//             <RewardPoints />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F0F4FF',
//     },
//     errorContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     errorText: {
//         fontSize: 16,
//         color: 'red',
//     },
// });

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationList from '@/components/MedicationList';
import RewardPoints from '@/components/RewardPoint';
import { useUserData } from '@/context/UserDataContext';
import { useFamilyContext } from '@/context/FamilyContext';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';

export default function HomeScreen({ navigation }) {
    const { user } = useUserData();
    const today = dayjs().format('YYYY-MM-DD'); // 오늘 날짜를 계산
    const { familyMembers, selectedFamily, setSelectedFamily } = useFamilyContext();
    const router = useRouter();

    // AsyncStorage 로그 확인 (디버깅 용도)
    AsyncStorage.getAllKeys().then((keys) => {
        AsyncStorage.multiGet(keys).then((result) => {
            console.log('AsyncStorage contents:', result);
        });
    });

    React.useEffect(() => {
        console.log('Family members from context:', familyMembers);
        console.log('Selected family from context:', selectedFamily);
    }, [familyMembers, selectedFamily]);

    const handleSelectFamily = (member) => {
        setSelectedFamily(member); // 선택된 가족 설정
        router.push('/familyMedication'); // (family) 탭으로 이동
    };

    return (
        <View style={styles.container}>
            {user && user.userId ? (
                <MedicationList userId={user.userId} selectedDate={today} />
            ) : (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>유저 정보를 불러오는 중입니다.</Text>
                </View>
            )}
            <RewardPoints />
            <View style={styles.familyContainer}>
                <Text style={styles.title}>우리가족</Text>
                <View style={styles.familyList}>
                    {familyMembers.map((member) => (
                        <TouchableOpacity
                            key={member.userId}
                            style={styles.familyButton}
                            onPress={() => handleSelectFamily(member)}
                        >
                            <Text style={styles.familyButtonText}>{member.familyRole}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4FF',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    familyContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 0,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        margin: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        paddingVertical: 10,
        backgroundColor: '#7686DB',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    familyList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // 가운데 정렬
        alignItems: 'center',
        gap: 12,
        padding: 16,
    },
    familyButton: {
        backgroundColor: '#AFB8DA', // 버튼 배경색
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8, // 둥근 모서리
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    familyButtonText: {
        color: '#FFFFFF', // 버튼 텍스트 색상
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

