import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserData } from '../../../context/UserDataContext';

export default function UserInfo() {
    const { user } = useUserData();
    const navigation = useNavigation();
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                    source={require('../../../assets/images/back.png')} // 뒤로가기 아이콘
                    style={styles.backIcon}
                    />
                </TouchableOpacity>
            <Text style={styles.headerTitle}>내 정보</Text>
            <View style={styles.placeholder}></View>
            </View>

            <Text style={styles.nameText}>
                {user.name} <Text style={styles.familyRoleText}>({userData.familyRole})</Text>
            </Text>

            <Text style={styles.infoText}>전화번호: {userData.phoneNumber}</Text>
            <Text style={styles.infoText}>성별: {userData.gender}</Text>
            <Text style={styles.infoText}>나이: {userData.age}세</Text>

            </View>
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
        paddingBottom: 30
      },
    header: {
        flexDirection: 'row', // 아이콘과 텍스트를 가로로 배치
        alignItems: 'center', // 세로 정렬
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        justifyContent: 'space-between', // 요소 간격을 균등하게 분배
        width: '100%',
        marginTop: 5,
      },
    backIcon: {
        width: 20, // 아이콘 너비
        height: 20, // 아이콘 높이
        marginRight: 8, // 텍스트와 간격
      },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
      },
    placeholder: {
        flex: 0.06, // 오른쪽에 빈 공간으로 대칭 맞추기
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
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 14,
        marginLeft: 2,
        marginTop: 13,
    },
      familyRoleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});
