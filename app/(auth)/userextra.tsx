import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function UserExtraPage() {
  const [familyRole, setFamilyRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = () => {
    if (!familyRole || !phoneNumber || !gender || !age) {
      setError('모든 필드를 입력해주세요.');
      return; // 필드가 비어 있으면 폼 제출을 막음
    }

    const userData = { familyRole, phoneNumber, gender, age };

    // 백엔드로 POST 요청
    fetch('http://localhost:8080/api/extrainfo', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
        // 성공 시 /main 페이지로 이동
        router.replace('/(main)');
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        setError('Failed to submit data. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>추가 정보 입력</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>구성원 별명:</Text>
        <TextInput
          style={styles.input}
          value={familyRole}
          onChangeText={setFamilyRole}
          placeholder="구성원 별명을 입력하세요"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>전화번호:</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="전화번호를 입력하세요"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>성별:</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="성별을 입력하세요"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>나이:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="나이를 입력하세요"
          keyboardType="numeric"
        />
      </View>

      <Button title="제출" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
