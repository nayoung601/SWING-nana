
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import * as Linking from 'expo-linking';

export default function Login() {
  // 환경에 따라 다른 URL 설정
  const backendUrl = Platform.OS === 'web' ? 'http://localhost:8080' : 'http://172.30.1.24:8080';

  const handleButtonClickKaKao = () => {
    const kakaoUrl = `${backendUrl}/oauth2/authorization/kakao?redirect_uri=myapp://loadingpage`;
    if (Platform.OS === 'web') {
      window.location.href = kakaoUrl; // 웹 환경에서는 현재 창에서 링크 열기
    } else {
      Linking.openURL(kakaoUrl); // 모바일 환경에서는 외부 브라우저에서 링크 열기
    }
  };

  const handleButtonClickNaver = () => {
    const naverUrl = `${backendUrl}/oauth2/authorization/naver?redirect_uri=myapp://loadingpage`;
    if (Platform.OS === 'web') {
      window.location.href = naverUrl; // 웹 환경에서는 현재 창에서 링크 열기
    } else {
      Linking.openURL(naverUrl); // 모바일 환경에서는 외부 브라우저에서 링크 열기
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WIN;C</Text>

      <Pressable onPress={handleButtonClickKaKao} style={styles.button}>
        <Image source={require('../assets/images/kakao_login.png')} style={styles.buttonImage} />
      </Pressable>

      <Pressable onPress={handleButtonClickNaver} style={styles.button}>
        <Image source={require('../assets/images/naver_login.png')} style={styles.buttonImage} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    marginBottom: 20,
  },
  buttonImage: {
    width: 200,
    height: 50,
  },
});

