// import React from 'react';
// import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';

// export default function Login() {
//   const handleButtonClickKaKao = async () => {
//     await WebBrowser.openBrowserAsync('http://localhost:8080/oauth2/authorization/kakao');
//   };

//   const handleButtonClickNaver = async () => {
//     await WebBrowser.openBrowserAsync('http://localhost:8080/oauth2/authorization/naver');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>WIN;C</Text>

//       <Pressable onPress={handleButtonClickKaKao} style={styles.button}>
//         <Image source={require('../assets/images/kakao_login.png')} style={styles.buttonImage} />
//       </Pressable>

//       <Pressable onPress={handleButtonClickNaver} style={styles.button}>
//         <Image source={require('../assets/images/naver_login.png')} style={styles.buttonImage} />
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     marginBottom: 50,
//   },
//   button: {
//     marginBottom: 20,
//   },
//   buttonImage: {
//     width: 200, // 이미지의 실제 크기로 조정 (가로 크기)
//     height: 50,  // 이미지의 실제 크기로 조정 (세로 크기)
//   },
// });

import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Login() {
  const [url, setUrl] = useState(null); // 웹뷰에 표시할 URL을 저장하는 상태

  const handleButtonClickKaKao = () => {
    const kakaoUrl = 'http://localhost:8080/oauth2/authorization/kakao';
    if (Platform.OS === 'web') {
      window.location.href = kakaoUrl; // 웹 환경에서는 현재 창에서 링크 열기
    } else {
      setUrl(kakaoUrl); // 모바일 환경에서는 WebView에 URL 설정
    }
  };

  const handleButtonClickNaver = () => {
    const naverUrl = 'http://localhost:8080/oauth2/authorization/naver';
    if (Platform.OS === 'web') {
      window.location.href = naverUrl; // 웹 환경에서는 현재 창에서 링크 열기
    } else {
      setUrl(naverUrl); // 모바일 환경에서는 WebView에 URL 설정
    }
  };

  // WebView 모드일 때 로그인 창 대신 웹뷰를 표시합니다.
  if (url && Platform.OS !== 'web') {
    return (
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onNavigationStateChange={(event) => {
          // 로그인 완료 시 WebView 종료 조건을 추가
          if (event.url.includes('successpage')) {
            setUrl(null); // WebView 닫기
          }
        }}
      />
    );
  }

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
