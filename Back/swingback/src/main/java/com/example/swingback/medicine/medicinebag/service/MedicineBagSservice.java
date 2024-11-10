package com.example.swingback.medicine.medicinebag.service;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.User.repository.UserRepository;
import com.example.swingback.error.CustomException;
import com.example.swingback.medicine.medicinebag.dto.MedicineBagDTO;
import com.example.swingback.medicine.medicinebag.dto.MedicineInputDTO;
import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import com.example.swingback.medicine.medicinebag.entity.NotificationTimeEntity;
import com.example.swingback.medicine.medicinebag.repository.MedicineBagRepository;
import com.example.swingback.medicine.medicineinput.entity.MedicineInputEntity;
import com.example.swingback.medicine.medicineinput.repository.MedicineInputRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MedicineBagSservice {

    private final MedicineBagRepository medicineBagRepository;
    private final MedicineInputRepository medicineInputRepository;
    private final UserRepository userRepository;

    public void saveMedicineInputAndBag(MedicineBagDTO medicineBagDTO) {
        //요청을 보내는 회원의 회원정보 가져오기
        UserEntity requestUserEntity =
                userRepository.findByUserId(medicineBagDTO.getUserId());
        // 요청한 사용자 ID가 유효한지 확인
        if (requestUserEntity == null) {
            throw new CustomException("유효하지 않은 사용자입니다. 요청한 사용자를 확인해주세요.");
        }


        // MedicineBagEntity 생성
        MedicineBagEntity medicineBag = MedicineBagEntity.builder()
                .medicineBagTitle(medicineBagDTO.getMedicineBagTitle())
                .userId(requestUserEntity)
                .registrationDate(medicineBagDTO.getRegistrationDate())
                .endDate(medicineBagDTO.getEndDate())
                .hidden(medicineBagDTO.getHidden())
                .medicinesInput(new ArrayList<>())
                .notificationTimes(new ArrayList<>())
                .build();

        // MedicineInputEntity 리스트 생성
        for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
            MedicineInputEntity medicineInput = MedicineInputEntity.builder()
                    .medicineBag(medicineBag) // 양방향 관계 설정
                    .medicineName(medicineDTO.getMedicineName())
                    .dosagePerIntake(medicineDTO.getDosagePerIntake())
                    .intakeConfirmed(medicineDTO.isIntakeConfirmed())
                    .build();

            // MedicineInputEntity 리스트에 추가
            medicineBag.getMedicinesInput().add(medicineInput);
        }
        // NotificationTimeEntity 리스트 생성
        for (LocalDateTime notificationTime : medicineBagDTO.getNotificationTimes()) {
            NotificationTimeEntity notificationTimeEntity = NotificationTimeEntity.builder()
                    .medicineBag(medicineBag) // 양방향 관계 설정
                    .notificationTime(notificationTime)
                    .build();

            // NotificationTimeEntity 리스트에 추가
            medicineBag.getNotificationTimes().add(notificationTimeEntity);
        }

        // MedicineBagEntity와 관련된 MedicineInputEntity들을 저장
        medicineBagRepository.save(medicineBag);

    }
}
