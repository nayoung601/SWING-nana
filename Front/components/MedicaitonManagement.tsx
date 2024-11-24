import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const MedicationManagement = ({ userId, selectedDate }) => {
    const [medicationData, setMedicationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId || !selectedDate) return; // userId 또는 selectedDate가 없는 경우 중단

            try {
                const response = await fetch(
                    `http://172.30.1.3:8080/api/medicine/${userId}?date=${selectedDate}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );

                if (!response.ok) throw new Error('Failed to fetch medication data');

                const data = await response.json();
                setMedicationData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMedicationData([]); // 데이터 없을 때 빈 배열 설정
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, selectedDate]); // userId 또는 selectedDate가 변경될 때마다 API 호출

    const handleIntakeConfirmation = async (intakeMedicineListId, currentStatus) => {
        try {
            const response = await fetch(
                `http://172.30.1.3:8080/api/medicine/intake?intakeMedicineListId=${intakeMedicineListId}&intakeConfirmed=${!currentStatus}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                }
            );

            if (!response.ok) throw new Error('Failed to update intake status');

            setMedicationData((prevData) =>
                prevData.map((medication) => ({
                    ...medication,
                    medicineList: medication.medicineList.map((medicine) =>
                        medicine.intakeMedicineListId === intakeMedicineListId
                            ? { ...medicine, intakeConfirmed: !currentStatus }
                            : medicine
                    ),
                }))
            );
        } catch (error) {
            console.error('Error updating intake status:', error);
        }
    };

    const handleAllIntakeConfirmation = async (medicationManagementId) => {
        try {
            const response = await fetch(
                `http://172.30.1.3:8080/api/medicine/intake/all?medicationManagementId=${medicationManagementId}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                }
            );

            if (!response.ok) throw new Error('Failed to update all intake status');

            setMedicationData((prevData) =>
                prevData.map((medication) =>
                    medication.medicationManagementId === medicationManagementId
                        ? {
                              ...medication,
                              totalIntakeConfirmed: true,
                              medicineList: medication.medicineList.map((medicine) => ({
                                  ...medicine,
                                  intakeConfirmed: true,
                              })),
                          }
                        : medication
                )
            );
        } catch (error) {
            console.error('Error updating all intake status:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {medicationData.length > 0 ? (
                medicationData.map((medication, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.time}>{medication.notificationTime}</Text>
                            <Text style={styles.title}>{medication.medicineBagName}</Text>
                            <Text style={styles.duration}>
                                {medication.notificationDate} (n일간)
                            </Text>
                        </View>
                        <View style={styles.medicineList}>
                            {medication.medicineList.map((medicine) => (
                                <View key={medicine.intakeMedicineListId} style={styles.medicineItem}>
                                    <Text style={styles.medicineName}>{medicine.medicineName}</Text>
                                    <Text style={styles.medicineDosage}>
                                        {medicine.dosagePerIntake}정
                                    </Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.intakeButton,
                                            medicine.intakeConfirmed ? styles.confirmed : styles.pending,
                                        ]}
                                        onPress={() =>
                                            handleIntakeConfirmation(
                                                medicine.intakeMedicineListId,
                                                medicine.intakeConfirmed
                                            )
                                        }
                                    >
                                        <Text style={styles.intakeButtonText}>
                                            {medicine.intakeConfirmed ? '✔️ 복용 완료' : '복용'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity
                            style={styles.allIntakeButton}
                            onPress={() => handleAllIntakeConfirmation(medication.medicationManagementId)}
                        >
                            <Text style={styles.allIntakeButtonText}>모두 복용</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>복용 기록이 없습니다</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4FF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        margin: 10,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        marginBottom: 10,
    },
    time: {
        fontSize: 16,
        color: '#555',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    duration: {
        fontSize: 14,
        color: '#999',
    },
    medicineList: {
        marginTop: 10,
    },
    medicineItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    medicineName: {
        fontSize: 16,
        flex: 2,
        color: '#333',
    },
    medicineDosage: {
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
        color: '#555',
    },
    intakeButton: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    confirmed: {
        backgroundColor: '#d4edda',
    },
    pending: {
        backgroundColor: '#f8d7da',
    },
    intakeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    allIntakeButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        borderRadius: 6,
        paddingVertical: 10,
        alignItems: 'center',
    },
    allIntakeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
});

export default MedicationManagement;
