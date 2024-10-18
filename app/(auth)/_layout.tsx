import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
      <Stack
        screenOptions={{
          headerShown: false, 
          contentStyle: {
            backgroundColor: '#AFB8DA', 
          },
        }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="successpage" />
      </Stack>
    );
  }
  
