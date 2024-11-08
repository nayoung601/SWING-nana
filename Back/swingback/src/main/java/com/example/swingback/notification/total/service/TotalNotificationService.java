package com.example.swingback.notification.total.service;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.error.CustomException;
import com.example.swingback.notification.fcmtest.service.FCMService;
import com.example.swingback.notification.message.dto.MessageTemplateDTO;
import com.example.swingback.notification.message.entity.MessageTemplateEntity;
import com.example.swingback.notification.message.repository.MessageTemplateRepository;
import com.example.swingback.notification.message.service.MessageTemplateService;
import com.example.swingback.notification.total.entity.TotalNotificationEntity;
import com.example.swingback.notification.total.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TotalNotificationService {

    private final NotificationRepository notificationRepository;
    private final MessageTemplateService messageTemplateService;
    private final FCMService fcmService;
    public void saveNotification(String type,
                                 UserEntity requestId,
                                 Long responseId,
                                 Boolean read,
                                 Boolean hidden,
                                 Date scheduledTime,
                                 Date sendTime,
                                 Long messageTemplate,
                                 Map<String, String> variables,
                                 String token) {
        /*
        알림보낼 메시지 템플릿을 불러옴
        messageTemplate : 템플릿 번호
        variables : 템플릿에 변수를 추가해서 변수를 어떻게 바꿔서 보여줄지 설정하는 부분
         */
        MessageTemplateDTO messageTemplateDTO = messageTemplateService.generateMessage(messageTemplate, variables);
        
        // 알림 테이블에 알림내역 저장
        TotalNotificationEntity totalNotificationEntity
                = TotalNotificationEntity.builder()
                .type(type)
                .responseId(responseId)
                .requestId(requestId)
                .sendTime(sendTime)
                .scheduledTime(scheduledTime)
                .hidden(hidden)
                .isRead(read)
                .message(messageTemplateDTO.getBody())
                .build();
        notificationRepository.save(totalNotificationEntity);
        
        // FCM알림 전송
        fcmService.sendNotification(token,messageTemplateDTO.getTitle(),messageTemplateDTO.getBody());

    }


}
