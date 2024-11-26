import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import OCRLayout from './OCRLayout';
import { useUserData } from '@/context/UserDataContext'; // 전역 사용자 데이터