package com.example.swingback.notification.total.controller;

import com.example.swingback.error.CustomException;
import com.example.swingback.notification.total.DTO.NotificationTableDTO;
import com.example.swingback.notification.total.service.TotalNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TotalNotificationController {

    private final TotalNotificationService totalNotificationService;
    @GetMapping("/api/notification/{userId}")
    public ResponseEntity<?> getNotification(@PathVariable Long userId) {
        List<NotificationTableDTO> list
                = totalNotificationService.getNotificationTable(userId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    @ExceptionHandler(CustomException.class) // 코드가 없을경우 400 에러 발생
    public ResponseEntity<String> handleUnauthorizedException(CustomException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
