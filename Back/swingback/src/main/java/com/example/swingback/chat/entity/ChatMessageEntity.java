package com.example.swingback.chat.entity;

import com.example.swingback.chat.commons.MessageType;
import com.example.swingback.chat.dto.ChatMessage;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_message")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_message_id")
    private Long chatMessageId;

    @Column(name = "room_id")
    private String roomId; // 채팅방 ID
    @Column(name = "sender")
    private String sender; // 보낸 사람
    @Column(name = "message")
    private String message; // 메시지 내용

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private MessageType type; // 메시지 타입 (CHAT, JOIN, LEAVE)
}
