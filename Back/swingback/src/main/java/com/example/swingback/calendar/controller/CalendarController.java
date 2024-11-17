package com.example.swingback.calendar.controller;

import com.example.swingback.calendar.dto.CalendarDTO;
import com.example.swingback.calendar.service.CalendarService;
import com.example.swingback.error.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/api/calendar/{userId}")
    public ResponseEntity<?> getCalendarInfo(@PathVariable Long userId,
                                             @RequestParam String date) {
        List<CalendarDTO> calendarInfo = calendarService.findCalendarInfo(userId, date);
        return (!calendarInfo.isEmpty()) ?
                ResponseEntity.status(HttpStatus.OK).body(calendarInfo) :
                ResponseEntity.status(HttpStatus.OK).body("일정이 없습니다");

    }
    @ExceptionHandler(CustomException.class) // 코드가 없을경우 400 에러 발생
    public ResponseEntity<String> handleUnauthorizedException(CustomException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
