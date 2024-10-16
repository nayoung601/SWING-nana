import { StyleSheet, View, Text } from 'react-native';

export default function Health(){
    return(
        <View style={styles.container}>
          <Text>health</Text>
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