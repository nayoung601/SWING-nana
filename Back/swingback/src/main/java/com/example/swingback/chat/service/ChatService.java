package com.example.swingback.chat.service;

import com.example.swingback.chat.dto.ChatMessage;
import com.example.swingback.chat.dto.ChatRoom;
import com.example.swingback.chat.entity.ChatMessageEntity;
import com.example.swingback.chat.repository.ChatMessageRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private Map<String, ChatRoom> chatRooms;
    private final SimpMessagingTemplate template;
    private final ChatMessageRepository chatMessageRepository;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
//        ChatRoom defaultRoom = ChatRoom.builder()
//                .roomId("1")
//                .name("Default Room")
//                .build();
//        chatRooms.put("1", defaultRoom);
    }

    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoom createRoom(String name) {
        String roomId = UUID.randomUUID().toString();
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(roomId)
                .name(name)
                .build();
        chatRooms.put(roomId, chatRoom);
        return chatRoom;
    }

    // /sub을 Config에서 설정해주었다.
    // 그래서 Message Broker가 해당 send를 캐치하고 해당 토픽을 구독하는 모든 사람에게 메시지를 보내게 된다.
    public ChatMessage sendMessage(ChatMessage message) {
        // 메시지 저장로직 추가
//        ChatRoom chatRoom = chatRooms.get(message.getRoomId());

        ChatMessageEntity entity = ChatMessageEntity.builder()
                .roomId(message.getRoomId())
                .sender(message.getSender())
                .message(message.getMessage())
                .type(message.getType())
                .build();
        ChatMessageEntity saveMessage = chatMessageRepository.save(entity);

        // ex) roomId가 2일때, /sub/chat/room/2를 구독하는 유저들에게 모두 메시지가 보낸다.
        template.convertAndSend("/sub/chat/room/" + saveMessage.getRoomId(), message);
        // 엔티티 -> DTO 변환
        return ChatMessage.builder()
                .roomId(saveMessage.getRoomId())
                .sender(saveMessage.getSender())
                .message(saveMessage.getMessage())
                .type(saveMessage.getType())
                .build();
    }
}