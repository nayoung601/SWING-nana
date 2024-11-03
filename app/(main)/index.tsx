import { View, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  AsyncStorage.getAllKeys().then((keys) => {
    AsyncStorage.multiGet(keys).then((result) => {
      console.log(result);
    });
  });
  return (
    <View style={styles.container}>
      <Text>hi there</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color: '#AFB8DA',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
