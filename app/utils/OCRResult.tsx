import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OCRLayout from './OCRLayout'; // OCRLayout.tsx 파일 경로
import { useLocalSearchParams } from 'expo-router';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const OCRResult: React.FC = () => {
  const { photoUri, prescription_date, medicineList } = useLocalSearchParams<{
    photoUri: string;
    prescription_date: string;
    medicineList: string;
  }>();

  // 데이터 확인
  console.log('photoUri:', photoUri);
  console.log('medicineList:', medicineList);

  const parsedMedicineList: Medicine[] = medicineList ? JSON.parse(medicineList) : [];

  return (
    <OCRLayout>
      <View style={styles.container}>
        {/* 이미지 출력 */}
        {photoUri ? (
          <Image source={{ uri: photoUri }} resizeMode="contain" style={styles.image} />
        ) : (
          <Text style={styles.errorText}>이미지가 없습니다.</Text>
        )}

        {/* 처방일자 출력 */}
        <Text style={styles.prescriptionDate}>처방일자: {prescription_date}</Text>

        {/* 약물 정보 출력 */}
        {parsedMedicineList.length > 0 ? (
          parsedMedicineList.map((medicine, index) => (
            <View key={index} style={styles.medicineContainer}>
              <Text style={styles.medicineText}>
                {medicine.name} - {medicine.dosage} {medicine.frequency} {medicine.duration}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noMedicineText}>약물 정보가 없습니다.</Text>
        )}
      </View>
    </OCRLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  prescriptionDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicineContainer: {
    marginVertical: 5,
  },
  medicineText: {
    fontSize: 16,
  },
  noMedicineText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OCRResult;
