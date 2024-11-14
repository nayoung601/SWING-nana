package com.example.swingback.medicine.medicationmanagement.dto;

import com.example.swingback.medicine.medicationmanagement.entity.IntakeMedicineListEntity;
import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class MedicationManagementDTO {

    private MedicineBagEntity medicineBag;

    private LocalDate notificationDate; // 알림 날짜 (기간내의 날짜)

    private LocalTime notificationTime; // 알림 시간 (사용자가 설정한 알림 시간)

    private boolean totalIntakeConfirmed;

    private List<IntakeMedicineListDTO> medicineListList;
}
