package com.example.swingback.medicine.medicinebag.dto;

import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NotificationTimeDTO {

    private MedicineBagEntity medicineBag;

    private LocalDateTime morningTime;

    private LocalDateTime lunchTime;

    private LocalDateTime dinnerTime;

    private LocalDateTime beforeSleepTime;

}
