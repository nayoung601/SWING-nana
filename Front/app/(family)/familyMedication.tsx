import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import dayjs from 'dayjs';

export default function FamilyMedication(){
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    return(
      <View style={styles.container}>
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* {user && user.userId ? (
          <MedicationManagement selectedDate={selectedDate} userId={user.userId} />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>유저 정보를 불러오는 중입니다.</Text>
          </View>
      )} */}
    </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F4FF',
      padding: 0,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 16,
      color: 'red',
    },
  });