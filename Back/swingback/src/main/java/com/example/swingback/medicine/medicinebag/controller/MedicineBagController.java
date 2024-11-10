package com.example.swingback.medicine.medicinebag.controller;

import com.example.swingback.error.CustomException;
import com.example.swingback.medicine.medicinebag.dto.MedicineBagDTO;
import com.example.swingback.medicine.medicinebag.dto.MedicineInputDTO;
import com.example.swingback.medicine.medicinebag.service.MedicineBagSservice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MedicineBagController {
    private final MedicineBagSservice medicineBagSservice;

    @PostMapping("/api/medicine")
    public ResponseEntity<?> saveUserMedicineBag(@RequestBody MedicineBagDTO medicineBagDTO) {
        // 받은 DTO 데이터를 처리하는 로직
        log.info("회원 ID: {}", medicineBagDTO.getUserId());
        log.info("약 제목: {}", medicineBagDTO.getMedicineBagTitle());

        for (MedicineInputDTO medicine : medicineBagDTO.getMedicineList()) {
            log.info("약 이름: {}", medicine.getMedicineName());
            log.info("복용량 {}", medicine.getDosagePerIntake());
            log.info("복용 확인: {}", medicine.isIntakeConfirmed());
        }
        for (LocalDateTime medicine : medicineBagDTO.getNotificationTimes()) {
            log.info("예약 시간 : {}",medicine );

        }
        medicineBagSservice.saveMedicineInputAndBag(medicineBagDTO);
        return ResponseEntity.status(HttpStatus.OK).body("등록 성공");
    }

    @ExceptionHandler(CustomException.class) // 코드가 없을경우 400 에러 발생
    public ResponseEntity<String> handleUnauthorizedException(CustomException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
