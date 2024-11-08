package com.example.swingback.notification.message.service;

import com.example.swingback.notification.message.dto.MessageTemplateDTO;
import com.example.swingback.notification.message.entity.MessageTemplateEntity;
import com.example.swingback.notification.message.repository.MessageTemplateRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

@Service
public class MessageTemplateService {

    @Autowired
    private MessageTemplateRepository repository;

    public MessageTemplateDTO generateMessage(Long templateId, Map<String, String> variables) {
        MessageTemplateEntity template = repository.findById(templateId)
                .orElseThrow(() -> new IllegalArgumentException("Template not found"));

        String title = template.getTitle();
        String body = template.getBody();

        // 변수를 대입하여 제목과 본문을 동적으로 생성
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String placeholder = "{" + entry.getKey() + "}";
            title = title.replace(placeholder, entry.getValue());
            body = body.replace(placeholder, entry.getValue());
        }

        return new MessageTemplateDTO(title, body);
    }
}

