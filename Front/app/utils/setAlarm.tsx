import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const SetAlarm: React.FC = () => {
  const { medicineList, registrationDate } = useLocalSearchParams<{
    medicineList: string;
    registrationDate: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>복약 알람 설정</Text>
      <Text style={styles.text}>조제일자: {registrationDate}</Text>
      <Text style={styles.text}>약물 정보: {medicineList}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F7F9FC' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 10 },
});

export default SetAlarm;
