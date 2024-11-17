import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from '@/components/Calendar';
import MedicationList from '@/components/MedicationList';
import RewardPoints from '@/components/RewardPoint';
import { useUserData } from '@/context/UserDataContext'; // UserDataContext 사용

export default function HomeScreen({ navigation }) {
    const { user } = useUserData(); // 현재 로그인된 유저 정보 가져오기

    // AsyncStorage 로그 확인 (디버깅 용도)
    AsyncStorage.getAllKeys().then((keys) => {
        AsyncStorage.multiGet(keys).then((result) => {
            console.log('AsyncStorage contents:', result);
        });
    });
    

    return (
        <View style={styles.container}>
            <Calendar style={styles.calendar} />
            {user && user.userId ? (
                <MedicationList navigation={navigation} userId={user.userId} /> 
            ) : (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>유저 정보를 불러오는 중입니다.</Text>
                </View>
            )}
            <RewardPoints />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4FF',
    },
    calendar: {
        width: '100%',
        paddingHorizontal: 0,
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
});
