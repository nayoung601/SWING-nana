import { View, Text, StyleSheet, Platform } from 'react-native';


export default function HomeScreen() {
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
