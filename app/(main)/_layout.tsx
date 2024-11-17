import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserData } from '@/context/UserDataContext';
import { Link } from 'expo-router';  // Link 임포트

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useUserData(); 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#595958',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 75,
          paddingBottom: 20,
        },
        headerShown: true, 
        headerStyle: { backgroundColor: '#AFB8DA' },
        headerTitleAlign: 'left', 
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Text style={styles.familyRoleText}>{user?.familyRole || '사용자'}</Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Link href="/notification">
              <TabBarIcon name="notifications" color="#ffffff" />
            </Link>

            <Link href="/chat">
              <TabBarIcon name="chatbubbles" color="#ffffff" />
            </Link>
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="medication"
        options={{
          title: '복약 관리',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'medkit' : 'medkit-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: '건강 캘린더',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '내 정보',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 5,
  },
  familyRoleText: {
    color: '#ffffff', 
    fontSize: 18,
    fontWeight: 'bold',     
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});
