// app/(auth)/login.js
import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 로직 구현
    // 로그인 성공 시 메인 탭으로 이동
    router.replace('/(main)/home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>로그인 화면</Text>
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={() => router.push('/(auth)/signup')} />
    </View>
  );
}
