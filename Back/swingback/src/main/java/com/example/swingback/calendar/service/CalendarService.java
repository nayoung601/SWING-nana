package com.example.swingback.calendar.service;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.User.repository.UserRepository;
import com.example.swingback.calendar.dto.CalendarDTO;
import com.example.swingback.calendar.dto.TargetMonthDTO;
import com.example.swingback.calendar.entity.CalendarEntity;
import com.example.swingback.calendar.repository.CalendarRepository;
import com.example.swingback.error.CustomException;
import com.sun.tools.jconsole.JConsoleContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final UserRepository userRepository;
    public List<CalendarDTO> findCalendarInfo(Long userId, String date) {
        //요청을 보내는 회원의 회원정보 가져오기
        UserEntity requestUserEntity =
                userRepository.findByUserId(userId);
        // 요청한 사용자 ID가 유효한지 확인
        if (requestUserEntity == null) {
            throw new CustomException("유효하지 않은 사용자입니다. 요청한 사용자를 확인해주세요.");
        }
        //캘린더 테이블에서 일정가져옴
        List<CalendarEntity> calendarEntity = calendarRepository.findByUserIdAndDisplayDate(requestUserEntity, date)
                .orElseThrow(() -> new CustomException("해당 일정이 존재하지 않음"));

        log.info("calendarEntity : {}",calendarEntity.toString());

        List<CalendarDTO> calendarDTOS = new ArrayList<>();
        for (CalendarEntity entity : calendarEntity) {
            List<TargetMonthDTO> targetMonthDTO = entity.getTargetMonthList().stream()
                    .map(targetMonthEntity -> TargetMonthDTO.builder()
                            .targetMonthId(targetMonthEntity.getTargetMonthId())
                            .targetMonth(targetMonthEntity.getTargetMonth())
                            .build())
                    .toList();
            CalendarDTO calendarDTO = CalendarDTO.builder()
                    .calendarTitle(entity.getCalendarTitle())
                    .calendarId(entity.getCalendarId())
                    .calendarTargetCode(entity.getCalendarTargetCode())
                    .startDate(entity.getStartDate())
                    .endDate(entity.getEndDate())
                    .target(targetMonthDTO)
                    .displayDate(date)
                    .build();
            calendarDTOS.add(calendarDTO);
        }

        return calendarDTOS;
    }
}
