package com.example.swingback.medicine.medicinebag.service;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.User.repository.UserRepository;
import com.example.swingback.calendar.common.BuilderCalendar;
import com.example.swingback.calendar.entity.CalendarEntity;
import com.example.swingback.calendar.repository.CalendarRepository;
import com.example.swingback.commons.NotificationType;
import com.example.swingback.error.CustomException;
import com.example.swingback.medicine.medicationmanagement.dto.IntakeMedicineListDTO;
import com.example.swingback.medicine.medicationmanagement.dto.MedicationManagementDTO;
import com.example.swingback.medicine.medicationmanagement.entity.IntakeMedicineListEntity;
import com.example.swingback.medicine.medicationmanagement.entity.MedicationManagementEntity;
import com.example.swingback.medicine.medicationmanagement.repository.IntakeMedicineListRepository;
import com.example.swingback.medicine.medicationmanagement.repository.MedicationManegementRepository;
import com.example.swingback.medicine.medicinebag.dto.MedicineBagDTO;
import com.example.swingback.medicine.medicineinput.dto.MedicineInputDTO;
import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import com.example.swingback.medicine.medicinebag.repository.MedicineBagRepository;
import com.example.swingback.medicine.medicineinput.entity.MedicineInputEntity;
import com.example.swingback.notification.message.dto.MessageTemplateDTO;
import com.example.swingback.notification.message.service.MessageTemplateService;
import com.example.swingback.notification.total.service.TotalNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MedicineBagSservice {

    private final MedicineBagRepository medicineBagRepository;
    private final UserRepository userRepository;
    private final IntakeMedicineListRepository intakeMedicineListRepository;
    private final MedicationManegementRepository medicationManegementRepository;
    private final BuilderCalendar builderCalendar;
    private final MessageTemplateService messageTemplateService;
    private final TotalNotificationService totalNotificationService;

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
                .type(medicineBagDTO.getType())
                .build();
        // 요청한 사용자 ID가 유효한지 확인
        if (medicineBag == null) {
            throw new CustomException("약정보 등록중 오류가 발생했습니다.");
        }
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

        //메시지 템플릿
        Long messageTemplate = 4L;
        Map<String, String> name = Map.of("medicine", medicineBagDTO.getMedicineBagTitle());
        /*
        알림보낼 메시지 템플릿을 불러옴
        messageTemplate : 템플릿 번호
        variables : 템플릿에 변수를 추가해서 변수를 어떻게 바꿔서 보여줄지 설정하는 부분
         */
        MessageTemplateDTO messageTemplateDTO = messageTemplateService.generateMessage(messageTemplate, name);


        //알림 시간 추출
        LocalTime morningTime=null;
        LocalTime lunchTime=null;
        LocalTime dinnerTime=null;
        LocalTime beforeSleepTime=null;
        if (medicineBagDTO.getMorningTime()!= null) {
            morningTime = medicineBagDTO.getMorningTime().toLocalTime();
        }
        if (medicineBagDTO.getLunchTime()!= null) {
            lunchTime = medicineBagDTO.getLunchTime().toLocalTime();
        }
        if (medicineBagDTO.getDinnerTime()!= null) {
            dinnerTime = medicineBagDTO.getDinnerTime().toLocalTime();
        }
        if (medicineBagDTO.getBeforeSleepTime()!= null) {
            beforeSleepTime = medicineBagDTO.getBeforeSleepTime().toLocalTime();
        }

        // 복약관리 테이블에 들어갈 날짜 만들기
        LocalDate currentDate = medicineBagDTO.getRegistrationDate();
        while (!currentDate.isAfter(medicineBagDTO.getEndDate())) { // currentDate 가 endDate와 같을때까지 true 반환
            //아침 약에대한 테이블 만들기
            if (morningTime != null) {
                MedicationManagementEntity morning = MedicationManagementEntity.builder()
                        .medicineBag(medicineBag)
                        .notificationDate(currentDate)
                        .notificationTime(morningTime)
                        .totalIntakeConfirmed(false)
                        .medicineList(new ArrayList<>())
                        .type(medicineBagDTO.getType())
                        .build();
                boolean checkFalg=false;
                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                    if (medicineDTO.getMorningTimebox()) {
                        checkFalg=true;
                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                                .medicationManagement(morning)
                                .medicineName(medicineDTO.getMedicineName())
                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
                                .intakeConfirmed(false)
                                .build();
                        morning.getMedicineList().add(list);
                    }

                }
                if (checkFalg) {
                    medicineBag.getMedicationManagementEntities().add(morning);

                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, morningTime);
//                    // LocalDateTime을 Date로 변환
//                    Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
                    if (!LocalDateTime.now().isAfter(localDateTime)) {
                        //아침약 복용리스트 등록
                        totalNotificationService
                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
                                        requestUserEntity.getUserId(),
                                        requestUserEntity,
                                        false,
                                        medicineBagDTO.getHidden(),
                                        localDateTime,
                                        null,
                                        messageTemplateDTO
                                );
                    }

                }

            }

            // 점심 약에대한 테이블 만들기
            if (lunchTime != null) {
                MedicationManagementEntity lunch = MedicationManagementEntity.builder()
                        .medicineBag(medicineBag)
                        .notificationDate(currentDate)
                        .notificationTime(lunchTime)
                        .totalIntakeConfirmed(false)
                        .medicineList(new ArrayList<>())
                        .type(medicineBagDTO.getType())
                        .build();
                boolean checkFalg=false;
                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                    if (medicineDTO.getLunchTimebox()) {
                        checkFalg=true;
                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                                .medicationManagement(lunch)
                                .medicineName(medicineDTO.getMedicineName())
                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
                                .intakeConfirmed(false)
                                .build();
                        lunch.getMedicineList().add(list);
                    }
                }

                if (checkFalg) {
                    //점심약 복용리스트 등록
                    medicineBag.getMedicationManagementEntities().add(lunch);

                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, lunchTime);
                    if (!LocalDateTime.now().isAfter(localDateTime)) {
                        //점심약 복용리스트 등록
                        totalNotificationService
                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
                                        requestUserEntity.getUserId(),
                                        requestUserEntity,
                                        false,
                                        medicineBagDTO.getHidden(),
                                        localDateTime,
                                        null,
                                        messageTemplateDTO
                                );
                    }

                }

            }


            // 저녁 약에대한 테이블 만들기
            if (dinnerTime != null) {
                MedicationManagementEntity dinner = MedicationManagementEntity.builder()
                        .medicineBag(medicineBag)
                        .notificationDate(currentDate)
                        .notificationTime(dinnerTime)
                        .totalIntakeConfirmed(false)
                        .medicineList(new ArrayList<>())
                        .type(medicineBagDTO.getType())
                        .build();
                boolean checkFalg=false;
                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                    if (medicineDTO.getDinnerTimebox()) {
                        checkFalg=true;
                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                                .medicationManagement(dinner)
                                .medicineName(medicineDTO.getMedicineName())
                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
                                .intakeConfirmed(false)
                                .build();
                        dinner.getMedicineList().add(list);
                    }
                }
                if (checkFalg) {
                    //저녁약 복용리스트 등록
                    medicineBag.getMedicationManagementEntities().add(dinner);

                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, dinnerTime);
                    if (!LocalDateTime.now().isAfter(localDateTime)) {
                        //저녁약 복용리스트 등록
                        totalNotificationService
                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
                                        requestUserEntity.getUserId(),
                                        requestUserEntity,
                                        false,
                                        medicineBagDTO.getHidden(),
                                        localDateTime,
                                        null,
                                        messageTemplateDTO
                                );
                    }

                }
            }




            // 자기전 약에대한 테이블 만들기
            if (beforeSleepTime != null) {
                MedicationManagementEntity beforeSleep = MedicationManagementEntity.builder()
                        .medicineBag(medicineBag)
                        .notificationDate(currentDate)
                        .notificationTime(beforeSleepTime)
                        .totalIntakeConfirmed(false)
                        .medicineList(new ArrayList<>())
                        .type(medicineBagDTO.getType())
                        .build();
                boolean checkFalg=false;
                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
                    if (medicineDTO.getBeforeSleepTimebox()) {
                        checkFalg =true;
                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
                                .medicationManagement(beforeSleep)
                                .medicineName(medicineDTO.getMedicineName())
                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
                                .intakeConfirmed(false)
                                .build();
                        beforeSleep.getMedicineList().add(list);
                    }
                }

                if (checkFalg) {
                    //자기전 약 복용리스트 등록
                    medicineBag.getMedicationManagementEntities().add(beforeSleep);

                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, beforeSleepTime);
                    if (!LocalDateTime.now().isAfter(localDateTime)) {
                        //자기전약 복용리스트 등록
                        totalNotificationService
                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
                                        requestUserEntity.getUserId(),
                                        requestUserEntity,
                                        false,
                                        medicineBagDTO.getHidden(),
                                        localDateTime,
                                        null,
                                        messageTemplateDTO
                                );
                    }

                }


            }



            //LocalDate는 불변(immutable) 객체이므로 반환된 값을 다시 저장해줘야함
            currentDate = currentDate.plusDays(1); //시작 날짜에서 하루씩 더하기
        }



        // MedicineBagEntity와 관련된 MedicineInputEntity들을 저장
        medicineBagRepository.save(medicineBag);

        builderCalendar.
                builderCalendarEntity(
                        requestUserEntity,
                        medicineBagDTO.getMedicineBagTitle(),
                        medicineBagDTO.getRegistrationDate(),
                        medicineBagDTO.getEndDate(),
                        "medicine");



        // FCM알림 전송
//        fcmService.sendNotification(latestTokenEntity.getToken(),messageTemplateDTO.getTitle(),messageTemplateDTO.getBody());

    }

    public List<MedicationManagementDTO> findMedicineBagInfo(Long userId, LocalDate date) {
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
            throw new CustomException("해당 날짜의 약 정보가 존재하지 않습니다");
        }
        List<MedicationManagementDTO> medicationManagementDTOS = new ArrayList<>();
        for (MedicineBagEntity medicineBag : byUserIdAndDateBetween) {
            for (MedicationManagementEntity medicationManagementEntity : medicineBag.getMedicationManagementEntities()) {
                if (medicationManagementEntity.getNotificationDate().isEqual(date)) {
                    // 변환 작업
                    List<IntakeMedicineListDTO> intakeMedicineListDTOs = medicationManagementEntity.getMedicineList().stream()
                            .map(intakeMedicineListEntity -> IntakeMedicineListDTO.builder()
                                    .intakeMedicineListId(intakeMedicineListEntity.getIntakeMedicineListId())
                                    .medicineName(intakeMedicineListEntity.getMedicineName())
                                    .dosagePerIntake(intakeMedicineListEntity.getDosagePerIntake())
                                    .intakeConfirmed(intakeMedicineListEntity.isIntakeConfirmed())
                                    .build())
                            .collect(Collectors.toList());

                    // DTO 빌드
                    MedicationManagementDTO addList = MedicationManagementDTO.builder()
                            .medicineBagId(medicineBag.getMedicineBagId())
                            .MedicationManagementId(medicationManagementEntity.getMedicationManagementId())
                            .medicineBagName(medicineBag.getMedicineBagTitle())
                            .notificationDate(medicationManagementEntity.getNotificationDate())
                            .notificationTime(medicationManagementEntity.getNotificationTime())
                            .totalIntakeConfirmed(medicationManagementEntity.isTotalIntakeConfirmed())
                            .hidden(medicineBag.isHidden())
                            .medicineList(intakeMedicineListDTOs)
                            .type(medicineBag.getType())
                            .build();

                    medicationManagementDTOS.add(addList);
                }
            }
        }
        // 데이터 보내기전에 시간순으로 정렬하기
        medicationManagementDTOS.sort(Comparator.comparing(MedicationManagementDTO::getNotificationTime));

        for (MedicationManagementDTO medicationManagementDTO : medicationManagementDTOS) {
            log.info("MedicationManagementId: {}", medicationManagementDTO.getMedicationManagementId());
            log.info("medicineBagId: {}", medicationManagementDTO.getMedicineBagId());
            log.info("medicineBagName: {}", medicationManagementDTO.getMedicineBagName());
            log.info("medicineList: {}", medicationManagementDTO.getMedicineList());
            log.info("notificationTime: {}", medicationManagementDTO.getNotificationTime());
            log.info("notificationDate: {}", medicationManagementDTO.getNotificationDate());
            log.info("totalIntakeConfirmed: {}", medicationManagementDTO.isTotalIntakeConfirmed());
            log.info("hidden: {}", medicationManagementDTO.isHidden());

        }

    return medicationManagementDTOS;
    }

    public void updateIntakeMedicineListIntakeConfirmed(Long intakeMedicineListId, boolean intakeConfirmed) {
        IntakeMedicineListEntity byId = intakeMedicineListRepository.findById(intakeMedicineListId)
                .orElseThrow(() ->new CustomException("유효하지 않은 복약정보입니다."));
        byId.setIntakeConfirmed(intakeConfirmed);
        intakeMedicineListRepository.save(byId);
    }

    public void updateAllIntakeConfirmed(Long medicationManagementId) {
        MedicationManagementEntity medicationManagement = medicationManegementRepository.findById(medicationManagementId)
                .orElseThrow(() -> new CustomException("유효하지 않은 복약관리 정보입니다."));

        // 모든 약의 intakeConfirmed를 true로 설정
        for (IntakeMedicineListEntity medicine : medicationManagement.getMedicineList()) {
            medicine.setIntakeConfirmed(true);
        }

        // totalIntakeConfirmed를 true로 설정
        medicationManagement.setIntakeConfirmed(true);

        medicationManegementRepository.save(medicationManagement);
    }
}
