import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// 예시 API 요청 함수
const fetchRewardPoints = async () => {
  // 실제 API 요청 대신 예시 데이터 반환
  return { points: 1320 }; // 실제 API가 구성되면 이 부분을 수정
};

export default function RewardPoints() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const getPoints = async () => {
      const data = await fetchRewardPoints();
      setPoints(data.points);
    };
    getPoints();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>적립 포인트</Text>
      </View>
      <View style={styles.contentContainer}>
        <Image source={require('../assets/images/dollar.png')} style={styles.image} />
        <Text style={styles.points}>{points} 포인트</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // 전체 컨테이너 흰색 배경
    borderRadius: 10,
    padding: 0,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleContainer: {
    backgroundColor: '#7686DB', // 보라색 배경
    width: '100%',
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // 흰색 폰트
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

