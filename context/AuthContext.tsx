// import React, { createContext, useState, useContext, useEffect } from 'react';

// // AuthContext 생성
// const AuthContext = createContext({ isLoggedIn: false, setIsLoggedIn: (value: boolean) => {} });

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         // 여기서 서버에 요청해서 로그인 상태 확인
//         const response = await fetch('http://localhost:8080/api/main', { credentials: 'include' });
//         const data = await response.json();
//         setIsLoggedIn(data.isLoggedIn); 
//       } catch (error) {
//         console.error('Failed to check login status:', error);
//       }
//     };
//     checkLoginStatus();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
