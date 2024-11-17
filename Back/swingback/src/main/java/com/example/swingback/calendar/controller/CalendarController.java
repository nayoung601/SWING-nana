package com.example.swingback.calendar.controller;

import com.example.swingback.calendar.dto.CalendarDTO;
import com.example.swingback.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

}
