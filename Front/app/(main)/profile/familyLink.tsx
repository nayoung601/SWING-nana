import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserData } from '../../../context/UserDataContext';

export default function FamilyLink() {
  const navigation = useNavigation();
  const { user } = useUserData();
  const [isLinked, setIsLinked] = useState(null); // 가족 연동 여부
  const [familyCode, setFamilyCode] = useState(''); // 가족 코드
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [inputFamilyCode, setInputFamilyCode] = useState(''); // 사용자 입력 가족 코드

  // 가족 연동 여부 확인
  const checkFamilyLink = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/family/code/${user.userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.text(); // "N" 또는 가족 코드 반환
      if (result === 'N') {
        setIsLinked(false); // 가족 연동되지 않은 상태
      } else {
        setIsLinked(true); // 가족 연동된 상태
        setFamilyCode(result); // 가족 코드 저장
      }
    } catch (error) {
      console.error('Error checking family link:', error);
    } finally {
      setLoading(false); // 로딩 해제
    }
  };

  // 가족 코드 발급
  const fetchFamilyCode = async () => {
    try {
      setLoading(true); // 로딩 상태 설정
      const response = await fetch(`http://localhost:8080/api/family/code`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.text(); // 가족 코드 반환
      setFamilyCode(result); // 가족 코드 저장
      setIsLinked(true); // 연동된 상태로 변경
      Alert.alert('가족 코드 발급 완료', `발급된 가족 코드: ${result}`);
    } catch (error) {
      console.error('Error fetching family code:', error);
      Alert.alert('오류', '가족 코드 발급 중 문제가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 해제
    }
  };

  // 가족 연동 요청
  const handleFamilyLinkRequest = async () => {
    try {
      setLoading(true); // 로딩 상태 설정
      const response = await fetch('http://localhost:8080/api/code/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          familyCode: inputFamilyCode, // 사용자 입력 가족 코드
          requestUserId: user.userId, // 현재 사용자 ID
        }),
      });

      if (response.ok) {
        Alert.alert('연동 성공', '가족 연동이 완료되었습니다!');
        checkFamilyLink(); // 가족 연동 여부 다시 확인
      } else {
        Alert.alert('연동 실패', '가족 연동 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error requesting family link:', error);
      Alert.alert('오류', '가족 연동 중 문제가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 해제
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    checkFamilyLink();
  }, []);

  // 로딩 화면
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>가족 연동 상태 확인 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>가족 연동</Text>
          <View style={styles.placeholder}></View>
        </View>

        {/* 가족 연동 여부에 따라 화면 구성 */}
        {!isLinked ? (
          // 가족 연동되지 않은 상태
          <View>
            <Text style={styles.infoText}>연동된 가족이 없습니다</Text>

            {/* 가족 코드 발급 버튼 */}
            <TouchableOpacity style={styles.button} onPress={fetchFamilyCode}>
              <Text style={styles.buttonText}>가족 코드 발급</Text>
            </TouchableOpacity>
            <Text style={styles.descriptionText}>
              첫 연동이라면 가족 코드를 발급받아 가족 구성원에게 알려주세요!
            </Text>

            {/* 가족 코드 입력 필드 */}
            <TextInput
              style={styles.input}
              placeholder="가족 코드 입력"
              value={inputFamilyCode} // TextInput 값
              onChangeText={setInputFamilyCode} // 입력값 업데이트
            />
            <TouchableOpacity style={styles.button} onPress={handleFamilyLinkRequest}>
              <Text style={styles.buttonText}>가족 연동하기</Text>
            </TouchableOpacity>
            <Text style={styles.descriptionText}>
              가족 구성원이 알려준 코드를 입력해 가족과 연동해보세요!
            </Text>
          </View>
        ) : (
          // 가족 연동된 상태
          <View>
            <Text style={styles.familyCode}>{familyCode}</Text>
            <Text style={styles.descriptionText}>
              가족 코드를 가족 구성원에게 알려주세요!
            </Text>

            {/* 가족 탈퇴 버튼 */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => console.log('가족 탈퇴하기')}>
              <Text style={styles.deleteButtonText}>가족 탈퇴하기</Text>
            </TouchableOpacity>
            <Text style={styles.descriptionText}>
              가족 탈퇴를 하게 되면 가족 연동 정보와 <br></br>가족 코드 내역이 모두 사라집니다.
            </Text>
          </View>
        )}
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
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'space-between', 
    width: '100%',
    marginTop: 5,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 20, // 오른쪽 여백
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  button: {
    backgroundColor: '#AFB8DA',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  familyCode: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#FF6F61',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 30,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});
