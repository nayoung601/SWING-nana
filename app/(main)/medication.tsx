import { StyleSheet, View, Text } from 'react-native';
import Calendar from '@/components/Calendar';
import MedicationManagement from '@/components/MedicaitonManagement';
import { useUserData } from '@/context/UserDataContext';

export default function Medication() {
  const { user } = useUserData();

  return (
    <View style={styles.container}>
      <Calendar style={styles.calendar} />
      {/* MedicationManagement 컴포넌트 */}
      <View style={styles.medicationManagementContainer}>
        <MedicationManagement userId={user.userId} />
      </View>
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
  medicationManagementContainer: {
    flex: 1, // 남은 화면 공간을 채움
    marginTop: 10,
    paddingHorizontal: 10,
  },
  contentText: {
    fontSize: 18,
    marginTop: 16,
  },
});
