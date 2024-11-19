import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OCRLayout from './OCRLayout'; // OCRLayout.tsx 파일 경로
import { useLocalSearchParams } from 'expo-router';

// Medicine 인터페이스 수정
interface Medicine {
  medicineName: string; // 약물 이름
  dosagePerIntake: number; // 1회 복용량
  frequencyIntake: number; // 복용 횟수
  durationIntake: number; // 복용 기간
}

const OCRResult: React.FC = () => {
  const { photoUri, registrationDate, medicineList } = useLocalSearchParams<{
    photoUri: string;
    registrationDate: string;
    medicineList: string;
  }>();

  // 데이터 확인
  console.log('photoUri:', photoUri);
  console.log('registrationDate:', registrationDate);
  console.log('medicineList:', medicineList);

  // medicineList 파싱
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

        {/* 조제일자 출력 */}
        {registrationDate ? (
          <Text style={styles.registrationDate}>조제일자: {registrationDate}</Text>
        ) : (
          <Text style={styles.errorText}>조제일자가 없습니다.</Text>
        )}

        {/* 약물 정보 출력 */}
        {parsedMedicineList.length > 0 ? (
          parsedMedicineList.map((medicine, index) => (
            <View key={index} style={styles.medicineContainer}>
              <Text style={styles.medicineText}>
                {medicine.medicineName} - {medicine.dosagePerIntake}정씩 {medicine.frequencyIntake}회 {medicine.durationIntake}일분
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
  registrationDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicineContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  medicineText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
