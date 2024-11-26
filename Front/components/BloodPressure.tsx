import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BloodPressure({ selectedDate, userId }) {
  const [bloodPressure, setBloodPressure] = useState([]); // 혈압 데이터 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  useEffect(() => {
    const fetchBloodPressure = async () => {
      if (!selectedDate || !userId) {
        setBloodPressure([]); // 날짜나 유저 ID가 없을 경우 초기화
        return;
      }

      setLoading(true); // 로딩 시작
      setBloodPressure([]); // 기존 데이터 초기화

      try {
        const response = await axios.get(`http://localhost:8080/api/calendar/day/${userId}`, {
          params: { date: selectedDate },
          withCredentials: true,
        });

        const bloodPressureData = response.data.find((item) => item.type === 'bloodpresure');
        setBloodPressure(bloodPressureData?.measurements || []); // 데이터가 없으면 빈 배열 설정
      } catch (error) {
        console.error('혈압 데이터 가져오기 실패:', error.message);
        setBloodPressure([]); // 에러 발생 시 상태 초기화
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchBloodPressure();
  }, [selectedDate, userId]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>혈압</Text>
      </View>
      {loading ? (
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color="#7686DB" />
          <Text style={styles.loadingText}>데이터를 불러오는 중입니다...</Text>
        </View>
      ) : bloodPressure.length > 0 ? (
        <View style={styles.contentContainer}>
          {bloodPressure.map((bp, index) => (
            <View key={index} style={styles.measurementContainer}>
              <Text style={styles.measurementTitle}>{bp.measureTitle}</Text>
              <Text style={styles.measurementValue}>
                {bp.highpressure}/{bp.lowpressure} mmHg
              </Text>
              {/* <Text style={styles.measurementDate}>{bp.registrationDate}</Text> */}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.noData}>해당 날짜의 혈압 데이터가 없습니다.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleContainer: {
    backgroundColor: '#7686DB',
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentContainer: {
    padding: 10,
  },
  measurementContainer: {
    marginBottom: 10,
  },
  measurementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  measurementValue: {
    fontSize: 16,
  },
  measurementDate: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
