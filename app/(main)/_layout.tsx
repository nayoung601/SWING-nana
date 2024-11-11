import { Tabs, useNavigation } from 'expo-router';  // useNavigation 추가
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserData } from '@/context/UserDataContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();  
  const { user } = useUserData(); 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
        // headerRight: () => (
        //   <View style={styles.headerRight}>
        //     <TouchableOpacity onPress={() => navigation.navigate('notify')}>
        //       <TabBarIcon name="notifications" color={Colors[colorScheme ?? 'light'].tint} />
        //     </TouchableOpacity>
            
        //     <TouchableOpacity onPress={() => navigation.navigate('setting')}>
        //       <TabBarIcon name="settings" color={Colors[colorScheme ?? 'light'].tint} />
        //     </TouchableOpacity>
        //   </View>
        // ),
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
