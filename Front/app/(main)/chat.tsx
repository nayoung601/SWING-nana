import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { connectWebSocket, sendMessage } from '@/components/ChatWebsocket';
import { useUserData } from '@/context/UserDataContext';

const ChatComponent = () => {
  const [roomId, setRoomId] = useState(''); // 현재 방 ID
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [input, setInput] = useState(''); // 메시지 입력값
  const [stompClient, setStompClient] = useState(null); // WebSocket 클라이언트

  const { user } = useUserData(); // UserDataContext에서 사용자 데이터 가져오기

  // 채팅방 조회 또는 생성
  const fetchOrCreateRoom = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/rooms?userId=${user.userId}`, {
        method: 'POST',
      });
      if (response.ok) {
        const room = await response.json();
        setRoomId(room.roomId); // 방 ID 설정
      } else {
        console.error('Failed to fetch or create room');
      }
    } catch (error) {
      console.error('Error fetching or creating room:', error);
    }
  };

  // 특정 방의 메시지 내역 가져오기
  const fetchMessages = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/rooms/${roomId}/messages`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data); // 기존 메시지 상태 초기화 후 추가
      } else {
        console.error('Failed to fetch messages for room:', roomId);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // WebSocket 연결 설정
  useEffect(() => {
    if (!stompClient) {
      console.log('Setting up WebSocket connection...');
      const client = connectWebSocket(() => {
        console.log('WebSocket connected.');
      });
      setStompClient(client);
    }
  }, []);

  // WebSocket 구독 로직 및 메시지 내역 가져오기
  useEffect(() => {
    if (roomId && stompClient && stompClient.connected) {
      console.log('WebSocket connected. Subscribing to room:', roomId);

      // 메시지 내역 가져오기
      fetchMessages(roomId);

      const subscription = stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        if (message.body) {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
        }
      });

      console.log(`Subscribed to room: ${roomId}`);

      // 구독 해제 로직
      return () => {
        subscription.unsubscribe();
        console.log(`Unsubscribed from room: ${roomId}`);
      };
    } else if (stompClient && !stompClient.connected) {
      console.error('STOMP client is not connected yet.');
    }
  }, [roomId, stompClient]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (input.trim() && stompClient && stompClient.connected && user.familyRole) {
      const message = {
        type: 'TALK',
        roomId,
        sender: user.familyRole,
        message: input,
      };
      sendMessage(stompClient, message);
      setInput('');
    } else {
      console.error('Cannot send message: WebSocket not connected or familyRole unavailable.');
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    if (user && user.userId) {
      fetchOrCreateRoom();
    }
  }, [user]);

  // 메시지 렌더링 (카카오톡 스타일)
  const renderMessage = ({ item }) => {
    const isMine = item.sender === user.familyRole;

    return (
      <View style={[styles.messageContainer, isMine ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.sender}>{isMine ? '나' : item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요"
        />
        <Button title="전송" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#daf8cb',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  sender: {
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
});

export default ChatComponent;
