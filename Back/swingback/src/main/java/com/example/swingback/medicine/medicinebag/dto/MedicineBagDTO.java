package com.example.swingback.medicine.medicinebag.dto;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class MedicineBagDTO {
    private Long userId; // 회원 ID
    private LocalDate registrationDate; // 등록일
    private LocalDate endDate; // 복용 종료일
//    private LocalDateTime notificationTime; // 알림 시간
    private String medicineBagTitle; // 약 제목
    private List<MedicineInputDTO> medicineList; // 등록 약 목록
    private List<LocalDateTime> notificationTimes; // 알림 시간 리스트
    private Boolean hidden;
    private Boolean totalIntakeConfirmed;
}
