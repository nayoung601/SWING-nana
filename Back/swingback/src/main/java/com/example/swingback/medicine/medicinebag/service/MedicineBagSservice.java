package com.example.swingback.medicine.medicinebag.service;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.User.repository.UserRepository;
import com.example.swingback.error.CustomException;
import com.example.swingback.medicine.medicationmanagement.entity.IntakeMedicineListEntity;
import com.example.swingback.medicine.medicationmanagement.entity.MedicationManagementEntity;
import com.example.swingback.medicine.medicinebag.dto.MedicineBagDTO;
import com.example.swingback.medicine.medicineinput.dto.MedicineInputDTO;
import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import com.example.swingback.medicine.medicinebag.repository.MedicineBagRepository;
import com.example.swingback.medicine.medicineinput.entity.MedicineInputEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MedicineBagSservice {

    private final MedicineBagRepository medicineBagRepository;
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
                .medicationManagementEntities(new ArrayList<>())
                .morningTime(medicineBagDTO.getMorningTime())
                .lunchTime(medicineBagDTO.getLunchTime())
                .dinnerTime(medicineBagDTO.getDinnerTime())
                .beforeSleepTime(medicineBagDTO.getBeforeSleepTime())
                .build();

        // MedicineInputEntity 리스트 생성
        for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
            MedicineInputEntity medicineInput = MedicineInputEntity.builder()
                    .medicineBag(medicineBag) // 양방향 관계 설정
                    .medicineName(medicineDTO.getMedicineName())
                    .dosagePerIntake(medicineDTO.getDosagePerIntake())
                    .frequencyIntake(medicineDTO.getFrequencyIntake())
                    .durationIntake(medicineDTO.getDurationIntake())
                    .morningTimebox(medicineDTO.getMorningTimebox())
                    .lunchTimebox(medicineDTO.getLunchTimebox())
                    .dinnerTimebox(medicineDTO.getDinnerTimebox())
                    .beforeSleepTimebox(medicineDTO.getBeforeSleepTimebox())
                    .build();

            // MedicineInputEntity 리스트에 추가
            medicineBag.getMedicinesInput().add(medicineInput);
        }

        //알림 시간 추출
        LocalTime morningTime = medicineBagDTO.getMorningTime().toLocalTime();
        LocalTime lunchTime = medicineBagDTO.getLunchTime().toLocalTime();
        LocalTime dinnerTime = medicineBagDTO.getDinnerTime().toLocalTime();
        LocalTime beforeSleepTime = medicineBagDTO.getBeforeSleepTime().toLocalTime();

        // 복약관리 테이블에 들어갈 날짜 만들기
        LocalDate currentDate = medicineBagDTO.getRegistrationDate();
        while (!currentDate.isAfter(medicineBagDTO.getEndDate())) { // currentDate 가 endDate와 같을때까지 true 반환
            //아침 약에대한 테이블 만들기
            MedicationManagementEntity morning = MedicationManagementEntity.builder()
                    .medicineBag(medicineBag)
                    .notificationDate(currentDate)
                    .notificationTime(morningTime)
                    .totalIntakeConfirmed(false)
                    .medicineList(new ArrayList<>())
                    .build();
            for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                if (medicineDTO.getMorningTimebox()) {
                    IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                            .medicationManagement(morning)
                            .medicineName(medicineDTO.getMedicineName())
                            .dosagePerIntake(medicineDTO.getDosagePerIntake())
                            .intakeConfirmed(false)
                            .build();
                    morning.getMedicineList().add(list);
                }

            }
            //아침약 복용리스트 등록
            medicineBag.getMedicationManagementEntities().add(morning);

            // 점심 약에대한 테이블 만들기
            MedicationManagementEntity lunch = MedicationManagementEntity.builder()
                    .medicineBag(medicineBag)
                    .notificationDate(currentDate)
                    .notificationTime(lunchTime)
                    .totalIntakeConfirmed(false)
                    .medicineList(new ArrayList<>())
                    .build();
            for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                if (medicineDTO.getLunchTimebox()) {
                    IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                            .medicationManagement(lunch)
                            .medicineName(medicineDTO.getMedicineName())
                            .dosagePerIntake(medicineDTO.getDosagePerIntake())
                            .intakeConfirmed(false)
                            .build();
                    lunch.getMedicineList().add(list);
                }
            }

            //점심약 복용리스트 등록
            medicineBag.getMedicationManagementEntities().add(lunch);

            // 저녁 약에대한 테이블 만들기
            MedicationManagementEntity dinner = MedicationManagementEntity.builder()
                    .medicineBag(medicineBag)
                    .notificationDate(currentDate)
                    .notificationTime(dinnerTime)
                    .totalIntakeConfirmed(false)
                    .medicineList(new ArrayList<>())
                    .build();
            for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                if (medicineDTO.getDinnerTimebox()) {
                    IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                            .medicationManagement(dinner)
                            .medicineName(medicineDTO.getMedicineName())
                            .dosagePerIntake(medicineDTO.getDosagePerIntake())
                            .intakeConfirmed(false)
                            .build();
                    dinner.getMedicineList().add(list);
                }
            }
            //저녁약 복용리스트 등록
            medicineBag.getMedicationManagementEntities().add(dinner);

            // 자기전 약에대한 테이블 만들기
            MedicationManagementEntity beforeSleep = MedicationManagementEntity.builder()
                    .medicineBag(medicineBag)
                    .notificationDate(currentDate)
                    .notificationTime(beforeSleepTime)
                    .totalIntakeConfirmed(false)
                    .medicineList(new ArrayList<>())
                    .build();
            for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                if (medicineDTO.getBeforeSleepTimebox()) {
                    IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                            .medicationManagement(beforeSleep)
                            .medicineName(medicineDTO.getMedicineName())
                            .dosagePerIntake(medicineDTO.getDosagePerIntake())
                            .intakeConfirmed(false)
                            .build();
                    beforeSleep.getMedicineList().add(list);
                }
            }
            //자기전 약 복용리스트 등록
            medicineBag.getMedicationManagementEntities().add(beforeSleep);

            //LocalDate는 불변(immutable) 객체이므로 반환된 값을 다시 저장해줘야함
            currentDate = currentDate.plusDays(1); //시작 날짜에서 하루씩 더하기
        }



        // MedicineBagEntity와 관련된 MedicineInputEntity들을 저장
        medicineBagRepository.save(medicineBag);

    }

    public void findMedicineBagInfo(Long userId, LocalDate date) {
        //요청을 보내는 회원의 회원정보 가져오기
        UserEntity requestUserEntity =
                userRepository.findByUserId(userId);
        // 요청한 사용자 ID가 유효한지 확인
        if (requestUserEntity == null) {
            throw new CustomException("유효하지 않은 사용자입니다. 요청한 사용자를 확인해주세요.");
        }
        List<MedicineBagEntity> byUserIdAndDateBetween = medicineBagRepository.findByUserIdAndDateBetween(userId, date);
        // 등록된 약봉투 데이터가 없는 경우 null 반환
        if (byUserIdAndDateBetween.isEmpty()) {
            log.info("No medicine bags found for userId: {} and date: {}", userId, date);
//            return null;
        }
        for (MedicineBagEntity medicineBag : byUserIdAndDateBetween) {
            // 로그에 객체 정보 출력
            log.info("MedicineBagEntity: {}", medicineBag);
        }

    }
}
