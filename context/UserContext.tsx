// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await AsyncStorage.getItem('userInfo');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsLoggedIn(true); // 사용자 데이터가 있으면 로그인 상태를 true로 설정
            }
        };
        loadUserData();
    }, []);

    const saveUser = async (userData) => {
        setUser(userData);
        setIsLoggedIn(true); // 사용자 데이터를 저장하면 로그인 상태를 true로 설정
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
    };

    const clearUser = async () => {
        setUser(null);
        setIsLoggedIn(false); // 사용자 데이터를 지우면 로그인 상태를 false로 설정
        await AsyncStorage.removeItem('userInfo');
    };

    return (
        <UserContext.Provider value={{ user, isLoggedIn, saveUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
