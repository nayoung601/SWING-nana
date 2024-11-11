import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDate } from '../context/DateContext';
import { fetchMedications } from '../api/medicationApi'; 

const MedicationList = ({ userId }) => {
  const { selectedDate } = useDate(); // selectedDate 가져오기
  const [medications, setMedications] = useState([]); // 복약 기록 상태

  // selectedDate 또는 userId가 변경될 때마다 데이터 가져오기
  useEffect(() => {
    const getMedications = async () => {
      const data = await fetchMedications(selectedDate, userId);
      setMedications(data);
    };
    getMedications();
  }, [selectedDate, userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 복용 리스트</Text>
      <View style={styles.medicationContainer}>
        {medications.length > 0 ? (
          medications.map((medication) => (
            <View key={medication.id} style={styles.medicationItem}>
              <Image source={{ uri: medication.image }} style={styles.medicationImage} />
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationTime}>{medication.time}</Text>
            </View>
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
    paddingVertical: 10,
  },
  medicationItem: {
    alignItems: 'center',
  },
  medicationImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  medicationName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  medicationTime: {
    fontSize: 12,
    color: '#999',
  },
  noMedicationText: {
    textAlign: 'center',
    color: '#999',
  },
});

export default MedicationList;
