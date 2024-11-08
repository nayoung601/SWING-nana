package com.example.swingback.notification.message.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private String variables;
}
