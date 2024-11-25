package com.example.swingback.chat.controller;

import com.example.swingback.chat.dto.ChatMessage;
import com.example.swingback.chat.dto.ChatRoom;
import com.example.swingback.chat.entity.ChatMessageEntity;
import com.example.swingback.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    // WebSocketConfig에서 setApplicationDestinationPrefixes()를 통해 prefix를 /pub으로 설정 해주었기 때문에,
    // 경로가 한번 더 수정되어 /pub/chat/message로 바뀐다.
    @MessageMapping("/chat/message")
    public ChatMessage  sendMessage(@Payload ChatMessage message) {
        return chatService.sendMessage(message);
    }

    @PostMapping("/rooms")
    public ChatRoom createRoom(@RequestParam String name) {
        return chatService.createRoom(name);
    }

    @GetMapping("/rooms")
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }

}
