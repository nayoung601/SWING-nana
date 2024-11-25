import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BloodSugar({ selectedDate, userId }) {
  const [bloodSugar, setBloodSugar] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBloodSugar = async () => {
      if (!selectedDate || !userId) return;
      setLoading(true);

      try {
        const params = { date: selectedDate }; // 요청에 보낼 params
        console.log('보내는 데이터 (params):', params);

        const response = await axios.get(`http://localhost:8080/api/calendar/day/${userId}`, {
          params, // params 전달
          withCredentials: true,
        });

        console.log('혈당 응답 데이터:', response.data);

        // bloodsugar 데이터만 필터링
        const bloodSugarData = response.data.find((item) => item.type === 'bloodsugar');
        if (bloodSugarData && Array.isArray(bloodSugarData.measurements)) {
          setBloodSugar(bloodSugarData.measurements);
        } else {
          setBloodSugar([]);
        }
      } catch (error) {
        console.error('혈당 데이터 가져오기 실패:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodSugar();
  }, [selectedDate, userId]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>혈당</Text>
      </View>
      {loading ? (
        <View style={styles.contentContainer}>
          <Text style={styles.loadingText}>데이터를 불러오는 중입니다...</Text>
        </View>
      ) : bloodSugar.length > 0 ? (
        <View style={styles.contentContainer}>
          {bloodSugar.map((bs, index) => (
            <View key={index} style={styles.measurementContainer}>
              <Text style={styles.measurementTitle}>{bs.measureTitle}</Text>
              <Text style={styles.measurementValue}>{bs.bloodsugar} mg/dL</Text>
              <Text style={styles.measurementDate}>{bs.registrationDate}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.noData}>해당 날짜의 혈당 데이터가 없습니다.</Text>
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
    color: '#333',
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
