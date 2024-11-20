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
  Platform,
} from 'react-native';
import OCRLayout from './OCRLayout';
import { useLocalSearchParams } from 'expo-router';

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
  const [editableDate, setEditableDate] = useState(registrationDate || '');

  const handleInputChange = (index: number, field: keyof Medicine, value: string) => {
    const updatedList = [...editableMedicineList];
    if (field === 'medicineName') {
      updatedList[index][field] = value;
    } else {
      const numericValue = parseInt(value, 10);
      updatedList[index][field] = isNaN(numericValue) ? 0 : numericValue;
    }
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
            <View style={styles.dateContainer}>
              <View style={styles.row}>
                <Text style={styles.dateLabel}>조제일자:</Text>
                {Platform.OS === 'web' ? (
                  <input
                    type="date"
                    value={editableDate}
                    onChange={(e) => setEditableDate(e.target.value)}
                    style={{
                      fontSize: 16,
                      border: '1px solid #6c75bd',
                      borderRadius: 5,
                      padding: 5,
                      backgroundColor: isEditing ? '#f4f4f4' : '#F1F1FA',
                      textAlign: 'center',
                      marginLeft: 10,
                    }}
                    disabled={!isEditing}
                  />
                ) : (
                  <TextInput
                    style={[styles.dateInput, isEditing && styles.editModeInput]}
                    value={editableDate}
                    editable={isEditing}
                    onChangeText={setEditableDate}
                  />
                )}
              </View>
            </View>


            {/* 약물 정보 출력 */}
            {editableMedicineList.length > 0 ? (
              editableMedicineList.map((medicine, index) => (
                <View key={index} style={styles.medicineContainer}>
                  {/* 약물 이름 */}
                  {Platform.OS === 'web' ? (
                    <input
                      type="text"
                      value={medicine.medicineName}
                      onChange={(e) =>
                        handleInputChange(index, 'medicineName', e.target.value)
                      }
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 5,
                        border: '1px solid #6c75bd',
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: isEditing ? '#f4f4f4' : '#F1F1FA',
                        textAlign: 'center',
                        width: '100%',
                      }}
                      disabled={!isEditing}
                    />
                  ) : (
                    <TextInput
                      style={[styles.medicineNameInput, isEditing && styles.editModeInput]}
                      value={medicine.medicineName}
                      editable={isEditing}
                      onChangeText={(value) =>
                        handleInputChange(index, 'medicineName', value)
                      }
                    />
                  )}

                  {/* 복용량, 횟수, 기간 */}
                  <View style={styles.row}>
                    {/* 복용량 */}
                    {Platform.OS === 'web' ? (
                      <input
                        type="number"
                        value={medicine.dosagePerIntake.toString()}
                        onChange={(e) =>
                          handleInputChange(index, 'dosagePerIntake', e.target.value)
                        }
                        style={{
                          fontSize: 16,
                          border: '1px solid #6c75bd',
                          borderRadius: 5,
                          padding: 5,
                          backgroundColor: isEditing ? '#f4f4f4' : '#F1F1FA',
                          textAlign: 'center',
                          width: 50,
                          marginLeft: 5,
                          marginRight: 5,
                        }}
                        disabled={!isEditing}
                      />
                    ) : (
                      <TextInput
                        style={[styles.input, isEditing && styles.editModeInput]}
                        value={medicine.dosagePerIntake.toString()}
                        editable={isEditing}
                        onChangeText={(value) =>
                          handleInputChange(index, 'dosagePerIntake', value)
                        }
                        keyboardType="numeric"
                      />
                    )}
                    <Text style={styles.unitText}>정씩</Text>

                    {/* 횟수 */}
                    {Platform.OS === 'web' ? (
                      <input
                        type="number"
                        value={medicine.frequencyIntake.toString()}
                        onChange={(e) =>
                          handleInputChange(index, 'frequencyIntake', e.target.value)
                        }
                        style={{
                          fontSize: 16,
                          border: '1px solid #6c75bd',
                          borderRadius: 5,
                          padding: 5,
                          backgroundColor: isEditing ? '#f4f4f4' : '#F1F1FA',
                          textAlign: 'center',
                          width: 50,
                          marginLeft: 5,
                          marginRight: 5,
                        }}
                        disabled={!isEditing}
                      />
                    ) : (
                      <TextInput
                        style={[styles.input, isEditing && styles.editModeInput]}
                        value={medicine.frequencyIntake.toString()}
                        editable={isEditing}
                        onChangeText={(value) =>
                          handleInputChange(index, 'frequencyIntake', value)
                        }
                        keyboardType="numeric"
                      />
                    )}
                    <Text style={styles.unitText}>회</Text>

                    {/* 기간 */}
                    {Platform.OS === 'web' ? (
                      <input
                        type="number"
                        value={medicine.durationIntake.toString()}
                        onChange={(e) =>
                          handleInputChange(index, 'durationIntake', e.target.value)
                        }
                        style={{
                          fontSize: 16,
                          border: '1px solid #6c75bd',
                          borderRadius: 5,
                          padding: 5,
                          backgroundColor: isEditing ? '#f4f4f4' : '#F1F1FA',
                          textAlign: 'center',
                          width: 50,
                          marginLeft: 5,
                          marginRight: 5,
                        }}
                        disabled={!isEditing}
                      />
                    ) : (
                      <TextInput
                        style={[styles.input, isEditing && styles.editModeInput]}
                        value={medicine.durationIntake.toString()}
                        editable={isEditing}
                        onChangeText={(value) =>
                          handleInputChange(index, 'durationIntake', value)
                        }
                        keyboardType="numeric"
                      />
                    )}
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
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => console.log('등록하기 버튼 클릭')}
            >
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
    padding: 20, // 더 넓은 내부 여백
    backgroundColor: '#F7F9FC', // 전체 배경 색상 변경
  },
  image: {
    width: '100%',
    height: 180, // 이미지 높이를 살짝 줄임
    marginBottom: 20, // 이미지와 조제일자 간격 조정
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0', // 은은한 테두리 색상
  },
  dateContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10, // 텍스트와 입력 필드 간격 추가
  },
  dateInput: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 2, // 테두리 두께 조정
    borderColor: '#AFB8DA',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#F1F1FA',
    textAlign: 'center',
    width: 120, // 날짜 입력 상자 크기 조정
  },
  registrationDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicineContainer: {
    marginVertical: 8, // 블록 간격 축소
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D9E6', // 더 밝은 테두리 색상
    borderRadius: 10,
    backgroundColor: '#F9FAFB', // 은은한 배경 색상
  },
  medicineNameInput: {
    fontSize: 16,
    fontWeight: '600', // 기존 'bold' 대신 조금 더 얇은 스타일
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D1D9E6',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8, // 블록 간격 추가
  },
  input: {
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#6c75bd',
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    width: 40, // 가로 폭 조정 (2자리 숫자 크기)
  },
  editModeInput: {
    backgroundColor: '#f4f4f4',
  },
  unitText: {
    fontSize: 16,
    fontWeight: '400', // 기본 글꼴로 변경
    marginHorizontal: 5,
    color: '#424242', // 더 부드러운 텍스트 색상
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
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#90CAF9', // 버튼 색상 변경
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // 둥근 모서리
    shadowColor: '#000', // 그림자 효과
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#42A5F5', // 버튼 색상 변경
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000', // 그림자 효과
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OCRResult;
