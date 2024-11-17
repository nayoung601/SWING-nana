import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDate } from '../context/DateContext';
import { Link } from 'expo-router';

const MedicationList = ({ userId }) => {
    const { selectedDate } = useDate();
    const [medicationData, setMedicationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                const response = await fetch(
                    `http://localhost:8080/api/medicine/${userId}?date=${selectedDate}`,
                    { method: 'GET', credentials: 'include' }
                );
                if (!response.ok) throw new Error('Failed to fetch medication data');
                const data = await response.json();
                setMedicationData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMedicationData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, selectedDate]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>오늘의 복용 리스트</Text>
            <View style={styles.medicationContainer}>
                {medicationData.length > 0 ? (
                    medicationData.map((medication, index) => (
                        <Link
                            key={index}
                            href="/medication"
                            style={styles.medicationItem} // 버튼 전체 스타일
                        >
                            <Image
                                source={{ uri: medication.image || 'https://via.placeholder.com/50' }}
                                style={styles.medicationImage} // 이미지 스타일
                            />
                            <View style={styles.medicationTextContainer}>
                                <Text style={styles.medicationName}>{medication.medicineBagName}</Text>
                                <Text style={styles.medicationTime}>{medication.time}</Text>
                            </View>
                        </Link>
                    ))
                ) : (
                    <Text style={styles.noMedicationText}>복용 기록이 없습니다</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    medicationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap', // 여러 줄 정렬 지원
    },
    medicationItem: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
        width: 80, // 고정된 버튼 폭
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 10,
    },
    medicationImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
        borderRadius: 5,
        resizeMode: 'contain',
        alignContent: 'center'
    },
    medicationTextContainer: {
        alignItems: 'center',
    },
    medicationName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    medicationTime: {
        fontSize: 12,
        color: '#666',
    },
    noMedicationText: {
        textAlign: 'center',
        color: '#999',
        marginVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MedicationList;
