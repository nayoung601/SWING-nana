// app/(auth)/signup.js
import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();

  const handleSignup = () => {
    // 회원가입 로직 구현
    // 회원가입 성공 시 로그인 화면으로 이동
    router.replace('/(auth)/login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>회원가입 화면</Text>
      <Button title="회원가입" onPress={handleSignup} />
    </View>
  );
}
