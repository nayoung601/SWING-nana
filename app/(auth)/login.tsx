import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Login() {
  const [showWebView, setShowWebView] = useState(false);
  const [loginUrl, setLoginUrl] = useState('');

  const handleButtonClickKaKao = () => {
    setLoginUrl('http://localhost:8080/oauth2/authorization/kakao');
    setShowWebView(true); // WebView 표시
  };

  const handleButtonClickNaver = () => {
    setLoginUrl('http://localhost:8080/oauth2/authorization/naver');
    setShowWebView(true); // WebView 표시
  };

  if (showWebView) {
    return (
      <WebView
        source={{ uri: loginUrl }}
        onNavigationStateChange={(event) => {
          // 로그인 성공 후 success URL로 리다이렉트 감지
          if (event.url.includes('/successpage')) {
            setShowWebView(false); // WebView 닫기
          }
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WIN;C</Text>

      <TouchableOpacity onPress={handleButtonClickKaKao} style={styles.button}>
        <Image source={require('../../assets/images/kakao_login.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleButtonClickNaver} style={styles.button}>
        <Image source={require('../../assets/images/naver_login.png')} style={styles.buttonImage} />
      </TouchableOpacity>
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
    width: 200, // 이미지의 실제 크기로 조정 (가로 크기)
    height: 50,  // 이미지의 실제 크기로 조정 (세로 크기)
  },
});
