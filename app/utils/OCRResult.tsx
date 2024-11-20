import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import OCRLayout from './OCRLayout';
import { useLocalSearchParams } from 'expo-router';
import { Platform, TextInput } from 'react-native';


interface Medicine {
  medicineName: string;
  dosagePerIntake: number;
  frequencyIntake: number;
  durationIntake: number;
}

const OCRResult: React.FC = () => {
  const { photoUri, registrationDate, medicineList } = useLocalSearchParams<{
    photoUri: string;
    registrationDate: string;
    medicineList: string;
  }>();

  const parsedMedicineList: Medicine[] = medicineList ? JSON.parse(medicineList) : [];

  const [isEditing, setIsEditing] = useState(false);
  const [editableMedicineList, setEditableMedicineList] = useState(parsedMedicineList);

  const handleInputChange = (index: number, field: keyof Medicine, value: string) => {
    const updatedList = [...editableMedicineList];
    updatedList[index][field] = field === 'medicineName' ? value : parseInt(value, 10);
    setEditableMedicineList(updatedList);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <OCRLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView>
            {/* 이미지 출력 */}
            {photoUri ? (
              <Image source={{ uri: photoUri }} resizeMode="contain" style={styles.image} />
            ) : (
              <Text style={styles.errorText}>이미지가 없습니다.</Text>
            )}

            {/* 조제일자 */}
            {registrationDate ? (
              <Text style={styles.registrationDate}>조제일자: {registrationDate}</Text>
            ) : (
              <Text style={styles.errorText}>조제일자가 없습니다.</Text>
            )}

            {/* 약물 정보 출력 */}
            {editableMedicineList.length > 0 ? (
              editableMedicineList.map((medicine, index) => (
                <View key={index} style={styles.medicineContainer}>
                  <TextInput
                    style={[styles.medicineNameInput, isEditing && styles.editModeInput]}
                    value={medicine.medicineName}
                    editable={isEditing}
                    onChangeText={(value) => handleInputChange(index, 'medicineName', value)}
                  />
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, isEditing && styles.editModeInput]}
                      value={medicine.dosagePerIntake.toString()}
                      editable={isEditing}
                      onChangeText={(value) => handleInputChange(index, 'dosagePerIntake', value)}
                      keyboardType="numeric"
                    />
                    <Text style={styles.unitText}>정씩</Text>
                    <TextInput
                      style={[styles.input, isEditing && styles.editModeInput]}
                      value={medicine.frequencyIntake.toString()}
                      editable={isEditing}
                      onChangeText={(value) => handleInputChange(index, 'frequencyIntake', value)}
                      keyboardType="numeric"
                    />
                    <Text style={styles.unitText}>회</Text>
                    <TextInput
                      style={[styles.input, isEditing && styles.editModeInput]}
                      value={medicine.durationIntake.toString()}
                      editable={isEditing}
                      onChangeText={(value) => handleInputChange(index, 'durationIntake', value)}
                      keyboardType="numeric"
                    />
                    <Text style={styles.unitText}>일분</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noMedicineText}>약물 정보가 없습니다.</Text>
            )}
          </ScrollView>

          {/* 하단 버튼 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={toggleEditing}>
              <Text style={styles.editButtonText}>{isEditing ? '수정 완료' : '수정하기'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => console.log('등록하기 버튼 클릭')}>
              <Text style={styles.registerButtonText}>등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </OCRLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
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
    borderColor: '#6c75bd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  medicineNameInput: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#6c75bd',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#F1F1FA',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#6c75bd',
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    width: 50, // 텍스트 상자의 가로 폭 조정
  },
  editModeInput: {
    backgroundColor: '#f4f4f4',
  },
  unitText: {
    fontSize: 16,
    marginHorizontal: 5,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#6c75bd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#6c75bd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default OCRResult;
