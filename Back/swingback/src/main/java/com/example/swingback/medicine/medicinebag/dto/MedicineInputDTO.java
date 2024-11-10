package com.example.swingback.medicine.medicinebag.dto;

import lombok.Getter;

@Getter
public class MedicineInputDTO {
    private String medicineName; // 약 이름
    private int dosagePerIntake; // 1회 섭취 횟수
    private boolean intakeConfirmed; // 복용 확인

}
