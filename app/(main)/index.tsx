import { View, Text, StyleSheet, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from '@/components/Calendar';
import MedicationList from '@/components/MedicationList';

export default function HomeScreen() {
  // AsyncStorage.getAllKeys().then((keys) => {
  //   AsyncStorage.multiGet(keys).then((result) => {
  //     console.log(result);
  //   });
  // }); //async storage 저장된 값 로그
  return (
    <View style={styles.container}>
      <Calendar style={styles.calendar} />
      <MedicationList userId = {1} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  header: {
    width: '100%',
    backgroundColor: '#AFB8DA',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  calendar: {
    width: '100%',       
    paddingHorizontal: 0,  
  },
  contentText: {
    fontSize: 18,
    marginTop: 16,
  },
});
