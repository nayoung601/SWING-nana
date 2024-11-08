package com.example.swingback.notification.message.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class MessageTemplateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId; // 템플릿 번호

    @Column
    private String title; // FCM제목에 들어갈 내용

    @Column
    private String body; // FCM 및 알림창 Body에 들어갈 내용

    @Column
    private String variables; // 템플릿마다 사용할 변수값
}
