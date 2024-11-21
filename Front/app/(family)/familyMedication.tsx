import { StyleSheet, View, Text } from 'react-native';
// import Calendar from '@/components/Calendar';

export default function FamilyMedication(){
    return(
        <View style={styles.container}>
            <Text>가족 복약관리 페이지</Text>
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