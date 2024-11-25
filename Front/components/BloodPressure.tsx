import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BloodPressure({ selectedDate, userId }) {
  const [bloodPressure, setBloodPressure] = useState([]);

  useEffect(() => {
    const fetchBloodPressure = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/healthcare`, {
          params: { userId, type: 'bloodpresure', date: selectedDate },
          withCredentials: true,
        });
        setBloodPressure(response.data.measurements || []);
      } catch (error) {
        console.error('혈압 데이터 가져오기 실패:', error);
      }
    };

    if (selectedDate) {
      fetchBloodPressure();
    }
  }, [selectedDate, userId]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>혈압</Text>
      </View>
      {bloodPressure.length > 0 ? (
        <View style={styles.contentContainer}>
          {bloodPressure.map((bp, index) => (
            <Text key={index} style={styles.measurement}>
              {bp.measureTitle}: {bp.highpressure}/{bp.lowpressure} mmHg
            </Text>
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
  measurement: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
