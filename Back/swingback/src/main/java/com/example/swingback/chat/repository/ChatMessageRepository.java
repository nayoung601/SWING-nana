package com.example.swingback.chat.repository;

import com.example.swingback.chat.dto.ChatMessage;
import com.example.swingback.chat.entity.ChatMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {
}
