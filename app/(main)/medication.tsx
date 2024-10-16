import { StyleSheet, View, Text } from 'react-native';

export default function Medication(){
    return(
      <View style={styles.container}>
        <Text>medication</Text>
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