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
import com.example.swingback.reward.entity.RewardEntity;
import com.example.swingback.reward.repository.RewardRepository;
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
    private final RewardRepository rewardRepository;

//    public void saveMedicineInputAndBag(MedicineBagDTO medicineBagDTO) {
//        //요청을 보내는 회원의 회원정보 가져오기
//        UserEntity requestUserEntity =
//                userRepository.findByUserId(medicineBagDTO.getUserId());
//        // 요청한 사용자 ID가 유효한지 확인
//        if (requestUserEntity == null) {
//            throw new CustomException("유효하지 않은 사용자입니다. 요청한 사용자를 확인해주세요.");
//        }
//
//
//        // MedicineBagEntity 생성
//        MedicineBagEntity medicineBag = MedicineBagEntity.builder()
//                .medicineBagTitle(medicineBagDTO.getMedicineBagTitle())
//                .userId(requestUserEntity)
//                .registrationDate(medicineBagDTO.getRegistrationDate())
//                .endDate(medicineBagDTO.getEndDate())
//                .hidden(medicineBagDTO.getHidden())
//                .medicinesInput(new ArrayList<>())
//                .medicationManagementEntities(new ArrayList<>())
//                .morningTime(medicineBagDTO.getMorningTime())
//                .lunchTime(medicineBagDTO.getLunchTime())
//                .dinnerTime(medicineBagDTO.getDinnerTime())
//                .beforeSleepTime(medicineBagDTO.getBeforeSleepTime())
//                .type(medicineBagDTO.getType())
//                .build();
//        // 요청한 사용자 ID가 유효한지 확인
//        if (medicineBag == null) {
//            throw new CustomException("약정보 등록중 오류가 발생했습니다.");
//        }
//        // MedicineInputEntity 리스트 생성
//        for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
//            MedicineInputEntity medicineInput = MedicineInputEntity.builder()
//                    .medicineBag(medicineBag) // 양방향 관계 설정
//                    .medicineName(medicineDTO.getMedicineName())
//                    .dosagePerIntake(medicineDTO.getDosagePerIntake())
//                    .frequencyIntake(medicineDTO.getFrequencyIntake())
//                    .durationIntake(medicineDTO.getDurationIntake())
//                    .morningTimebox(medicineDTO.getMorningTimebox())
//                    .lunchTimebox(medicineDTO.getLunchTimebox())
//                    .dinnerTimebox(medicineDTO.getDinnerTimebox())
//                    .beforeSleepTimebox(medicineDTO.getBeforeSleepTimebox())
//                    .build();
//
//            // MedicineInputEntity 리스트에 추가
//            medicineBag.getMedicinesInput().add(medicineInput);
//        }
//
//        //메시지 템플릿
//        Long messageTemplate = 4L;
//        Map<String, String> name = Map.of("medicine", medicineBagDTO.getMedicineBagTitle());
//        /*
//        알림보낼 메시지 템플릿을 불러옴
//        messageTemplate : 템플릿 번호
//        variables : 템플릿에 변수를 추가해서 변수를 어떻게 바꿔서 보여줄지 설정하는 부분
//         */
//        MessageTemplateDTO messageTemplateDTO = messageTemplateService.generateMessage(messageTemplate, name);
//
//
//        //알림 시간 추출
//        LocalTime morningTime=null;
//        LocalTime lunchTime=null;
//        LocalTime dinnerTime=null;
//        LocalTime beforeSleepTime=null;
//        if (medicineBagDTO.getMorningTime()!= null) {
//            morningTime = medicineBagDTO.getMorningTime().toLocalTime();
//        }
//        if (medicineBagDTO.getLunchTime()!= null) {
//            lunchTime = medicineBagDTO.getLunchTime().toLocalTime();
//        }
//        if (medicineBagDTO.getDinnerTime()!= null) {
//            dinnerTime = medicineBagDTO.getDinnerTime().toLocalTime();
//        }
//        if (medicineBagDTO.getBeforeSleepTime()!= null) {
//            beforeSleepTime = medicineBagDTO.getBeforeSleepTime().toLocalTime();
//        }
//
//        // 복약관리 테이블에 들어갈 날짜 만들기
//        LocalDate currentDate = medicineBagDTO.getRegistrationDate();
//        while (!currentDate.isAfter(medicineBagDTO.getEndDate())) { // currentDate 가 endDate와 같을때까지 true 반환
//            //아침 약에대한 테이블 만들기
//            if (morningTime != null) {
//                MedicationManagementEntity morning = MedicationManagementEntity.builder()
//                        .medicineBag(medicineBag)
//                        .notificationDate(currentDate)
//                        .notificationTime(morningTime)
//                        .totalIntakeConfirmed(false)
//                        .medicineList(new ArrayList<>())
//                        .type(medicineBagDTO.getType())
//                        .build();
//                boolean checkFalg=false;
//                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
//                    if (medicineDTO.getMorningTimebox()) {
//                        checkFalg=true;
//                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
//                                .medicationManagement(morning)
//                                .medicineName(medicineDTO.getMedicineName())
//                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
//                                .intakeConfirmed(false)
//                                .build();
//                        morning.getMedicineList().add(list);
//                    }
//
//                }
//                if (checkFalg) {
//                    medicineBag.getMedicationManagementEntities().add(morning);
//
//                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, morningTime);
////                    // LocalDateTime을 Date로 변환
////                    Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
//                    if (!LocalDateTime.now().isAfter(localDateTime)) {
//                        //아침약 복용리스트 등록
//                        totalNotificationService
//                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
//                                        requestUserEntity.getUserId(),
//                                        requestUserEntity,
//                                        false,
//                                        medicineBagDTO.getHidden(),
//                                        localDateTime,
//                                        null,
//                                        messageTemplateDTO
//                                );
//                    }
//
//                }
//
//            }
//
//            // 점심 약에대한 테이블 만들기
//            if (lunchTime != null) {
//                MedicationManagementEntity lunch = MedicationManagementEntity.builder()
//                        .medicineBag(medicineBag)
//                        .notificationDate(currentDate)
//                        .notificationTime(lunchTime)
//                        .totalIntakeConfirmed(false)
//                        .medicineList(new ArrayList<>())
//                        .type(medicineBagDTO.getType())
//                        .build();
//                boolean checkFalg=false;
//                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
//                    if (medicineDTO.getLunchTimebox()) {
//                        checkFalg=true;
//                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
//                                .medicationManagement(lunch)
//                                .medicineName(medicineDTO.getMedicineName())
//                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
//                                .intakeConfirmed(false)
//                                .build();
//                        lunch.getMedicineList().add(list);
//                    }
//                }
//
//                if (checkFalg) {
//                    //점심약 복용리스트 등록
//                    medicineBag.getMedicationManagementEntities().add(lunch);
//
//                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, lunchTime);
//                    if (!LocalDateTime.now().isAfter(localDateTime)) {
//                        //점심약 복용리스트 등록
//                        totalNotificationService
//                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
//                                        requestUserEntity.getUserId(),
//                                        requestUserEntity,
//                                        false,
//                                        medicineBagDTO.getHidden(),
//                                        localDateTime,
//                                        null,
//                                        messageTemplateDTO
//                                );
//                    }
//
//                }
//
//            }
//
//
//            // 저녁 약에대한 테이블 만들기
//            if (dinnerTime != null) {
//                MedicationManagementEntity dinner = MedicationManagementEntity.builder()
//                        .medicineBag(medicineBag)
//                        .notificationDate(currentDate)
//                        .notificationTime(dinnerTime)
//                        .totalIntakeConfirmed(false)
//                        .medicineList(new ArrayList<>())
//                        .type(medicineBagDTO.getType())
//                        .build();
//                boolean checkFalg=false;
//                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
//                    if (medicineDTO.getDinnerTimebox()) {
//                        checkFalg=true;
//                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
//                                .medicationManagement(dinner)
//                                .medicineName(medicineDTO.getMedicineName())
//                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
//                                .intakeConfirmed(false)
//                                .build();
//                        dinner.getMedicineList().add(list);
//                    }
//                }
//                if (checkFalg) {
//                    //저녁약 복용리스트 등록
//                    medicineBag.getMedicationManagementEntities().add(dinner);
//
//                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, dinnerTime);
//                    if (!LocalDateTime.now().isAfter(localDateTime)) {
//                        //저녁약 복용리스트 등록
//                        totalNotificationService
//                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
//                                        requestUserEntity.getUserId(),
//                                        requestUserEntity,
//                                        false,
//                                        medicineBagDTO.getHidden(),
//                                        localDateTime,
//                                        null,
//                                        messageTemplateDTO
//                                );
//                    }
//
//                }
//            }
//
//
//
//
//            // 자기전 약에대한 테이블 만들기
//            if (beforeSleepTime != null) {
//                MedicationManagementEntity beforeSleep = MedicationManagementEntity.builder()
//                        .medicineBag(medicineBag)
//                        .notificationDate(currentDate)
//                        .notificationTime(beforeSleepTime)
//                        .totalIntakeConfirmed(false)
//                        .medicineList(new ArrayList<>())
//                        .type(medicineBagDTO.getType())
//                        .build();
//                boolean checkFalg=false;
//                for (MedicineInputDTO medicineDTO : medicineBagDTO.getMedicineList()) {
//                    if (medicineDTO.getBeforeSleepTimebox()) {
//                        checkFalg =true;
//                        IntakeMedicineListEntity list = IntakeMedicineListEntity.builder()
//                                .medicationManagement(beforeSleep)
//                                .medicineName(medicineDTO.getMedicineName())
//                                .dosagePerIntake(medicineDTO.getDosagePerIntake())
//                                .intakeConfirmed(false)
//                                .build();
//                        beforeSleep.getMedicineList().add(list);
//                    }
//                }
//
//                if (checkFalg) {
//                    //자기전 약 복용리스트 등록
//                    medicineBag.getMedicationManagementEntities().add(beforeSleep);
//
//                    LocalDateTime localDateTime = LocalDateTime.of(currentDate, beforeSleepTime);
//                    if (!LocalDateTime.now().isAfter(localDateTime)) {
//                        //자기전약 복용리스트 등록
//                        totalNotificationService
//                                .saveNotification(NotificationType.MEDICATION_REMINDER.getDescription(),
//                                        requestUserEntity.getUserId(),
//                                        requestUserEntity,
//                                        false,
//                                        medicineBagDTO.getHidden(),
//                                        localDateTime,
//                                        null,
//                                        messageTemplateDTO
//                                );
//                    }
//
//                }
//
//
//            }
//
//
//
//            //LocalDate는 불변(immutable) 객체이므로 반환된 값을 다시 저장해줘야함
//            currentDate = currentDate.plusDays(1); //시작 날짜에서 하루씩 더하기
//        }
//
//
//
//        // MedicineBagEntity와 관련된 MedicineInputEntity들을 저장
//        medicineBagRepository.save(medicineBag);
//
//        builderCalendar.
//                builderCalendarEntity(
//                        requestUserEntity,
//                        medicineBagDTO.getMedicineBagTitle(),
//                        medicineBagDTO.getRegistrationDate(),
//                        medicineBagDTO.getEndDate(),
//                        "medicine");
//
//
//
//        // FCM알림 전송
////        fcmService.sendNotification(latestTokenEntity.getToken(),messageTemplateDTO.getTitle(),messageTemplateDTO.getBody());
//
//    }
public void saveMedicineInputAndBag(MedicineBagDTO medicineBagDTO) {
    // 1. 사용자 유효성 검증
    UserEntity requestUserEntity = validateAndGetUser(medicineBagDTO.getUserId());

    // 2. MedicineBagEntity 생성
    MedicineBagEntity medicineBag = createMedicineBag(medicineBagDTO, requestUserEntity);

    // 3. MedicineInputEntity 리스트 생성 및 추가
    addMedicineInputsToBag(medicineBagDTO, medicineBag);

    // 4. 복약 관리 엔티티 생성 및 알림 설정
    createMedicationManagementAndNotifications(medicineBagDTO, medicineBag, requestUserEntity);

    // 5. MedicineBagEntity 저장
    medicineBagRepository.save(medicineBag);

    // 6. 캘린더 엔트리 생성
    builderCalendar.builderCalendarEntity(
            requestUserEntity,
            medicineBagDTO.getMedicineBagTitle(),
            medicineBagDTO.getRegistrationDate(),
            medicineBagDTO.getEndDate(),
            "medicine"
    );
}

    //사용자 유효성 검증
    private UserEntity validateAndGetUser(Long userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) {
            throw new CustomException("유효하지 않은 사용자입니다. 요청한 사용자를 확인해주세요.");
        }
        return userEntity;
    }
    //MedicineBagEntity 생성
    private MedicineBagEntity createMedicineBag(MedicineBagDTO dto, UserEntity user) {
        return MedicineBagEntity.builder()
                .medicineBagTitle(dto.getMedicineBagTitle())
                .userId(user)
                .registrationDate(dto.getRegistrationDate())
                .endDate(dto.getEndDate())
                .hidden(dto.getHidden())
                .medicinesInput(new ArrayList<>())
                .medicationManagementEntities(new ArrayList<>())
                .morningTime(dto.getMorningTime())
                .lunchTime(dto.getLunchTime())
                .dinnerTime(dto.getDinnerTime())
                .beforeSleepTime(dto.getBeforeSleepTime())
                .type(dto.getType())
                .build();
    }
    //MedicineInputEntity 리스트 생성 및 추가
    private void addMedicineInputsToBag(MedicineBagDTO dto, MedicineBagEntity medicineBag) {
        for (MedicineInputDTO medicineDTO : dto.getMedicineList()) {
            MedicineInputEntity medicineInput = MedicineInputEntity.builder()
                    .medicineBag(medicineBag)
                    .medicineName(medicineDTO.getMedicineName())
                    .dosagePerIntake(medicineDTO.getDosagePerIntake())
                    .frequencyIntake(medicineDTO.getFrequencyIntake())
                    .durationIntake(medicineDTO.getDurationIntake())
                    .morningTimebox(medicineDTO.getMorningTimebox())
                    .lunchTimebox(medicineDTO.getLunchTimebox())
                    .dinnerTimebox(medicineDTO.getDinnerTimebox())
                    .beforeSleepTimebox(medicineDTO.getBeforeSleepTimebox())
                    .build();
            medicineBag.getMedicinesInput().add(medicineInput);
        }
    }
    //복약 관리 엔티티 생성 및 알림 설정
    private void createMedicationManagementAndNotifications(
            MedicineBagDTO dto,
            MedicineBagEntity medicineBag,
            UserEntity user
    ) {
        Map<String, LocalTime> notificationTimes = extractNotificationTimes(dto);
        LocalDate currentDate = dto.getRegistrationDate();

        while (!currentDate.isAfter(dto.getEndDate())) {
            for (Map.Entry<String, LocalTime> entry : notificationTimes.entrySet()) {
                String timeType = entry.getKey();
                LocalTime time = entry.getValue();
                if (time != null) {
                    createNotificationForTime(dto, medicineBag, user, currentDate, timeType, time);
                }
            }
            currentDate = currentDate.plusDays(1);
        }
    }
    //알림 시간 추출
    private Map<String, LocalTime> extractNotificationTimes(MedicineBagDTO dto) {
        Map<String, LocalTime> times = new HashMap<>();
        times.put("morning", dto.getMorningTime() != null ? dto.getMorningTime().toLocalTime() : null);
        times.put("lunch", dto.getLunchTime() != null ? dto.getLunchTime().toLocalTime() : null);
        times.put("dinner", dto.getDinnerTime() != null ? dto.getDinnerTime().toLocalTime() : null);
        times.put("beforeSleep", dto.getBeforeSleepTime() != null ? dto.getBeforeSleepTime().toLocalTime() : null);
        return times;
    }
    //알림 생성 로직
    private void createNotificationForTime(
            MedicineBagDTO dto,
            MedicineBagEntity medicineBag,
            UserEntity user,
            LocalDate date,
            String timeType,
            LocalTime time
    ) {
        MedicationManagementEntity managementEntity = createMedicationManagementEntity(dto, medicineBag, date, time);
        boolean hasMedicine = addMedicinesToManagement(dto, managementEntity, timeType);

        if (hasMedicine) {
            medicineBag.getMedicationManagementEntities().add(managementEntity);
//            scheduleNotification(dto, user, managementEntity, date, time);
            scheduleNotification(dto, user, date, time);
        }
    }
    //MedicationManagementEntity 생성
    private MedicationManagementEntity createMedicationManagementEntity(
            MedicineBagDTO dto,
            MedicineBagEntity bag,
            LocalDate date,
            LocalTime time
    ) {
        return MedicationManagementEntity.builder()
                .medicineBag(bag)
                .notificationDate(date)
                .notificationTime(time)
                .totalIntakeConfirmed(false)
                .medicineList(new ArrayList<>())
                .type(dto.getType())
                .build();
    }
    //약 리스트 추가 및 확인
    private boolean addMedicinesToManagement(
            MedicineBagDTO dto,
            MedicationManagementEntity managementEntity,
            String timeType
    ) {
        boolean hasMedicine = false;
        for (MedicineInputDTO medicineDTO : dto.getMedicineList()) {
            if (isMedicineScheduledForTime(medicineDTO, timeType)) {
                IntakeMedicineListEntity medicineList = IntakeMedicineListEntity.builder()
                        .medicationManagement(managementEntity)
                        .medicineName(medicineDTO.getMedicineName())
                        .dosagePerIntake(medicineDTO.getDosagePerIntake())
                        .intakeConfirmed(false)
                        .build();
                managementEntity.getMedicineList().add(medicineList);
                hasMedicine = true;
            }
        }
        return hasMedicine;
    }
    //
    private boolean isMedicineScheduledForTime(MedicineInputDTO medicineDTO, String timeType) {
        switch (timeType) {
            case "morning": return medicineDTO.getMorningTimebox();
            case "lunch": return medicineDTO.getLunchTimebox();
            case "dinner": return medicineDTO.getDinnerTimebox();
            case "beforeSleep": return medicineDTO.getBeforeSleepTimebox();
            default: return false;
        }
    }

    //알림 예약
    private void scheduleNotification(
            MedicineBagDTO dto,
            UserEntity user,
//            MedicationManagementEntity managementEntity,
            LocalDate date,
            LocalTime time
    ) {
        LocalDateTime notificationDateTime = LocalDateTime.of(date, time);
//        if (!LocalDateTime.now().isAfter(notificationDateTime)) {
//            MessageTemplateDTO messageTemplate = messageTemplateService.generateMessage(4L,
//                    Map.of("medicine", dto.getMedicineBagTitle()));
//            totalNotificationService.saveNotification(
//                    NotificationType.MEDICATION_REMINDER.getDescription(),
//                    user.getUserId(),
//                    user,
//                    false,
//                    dto.getHidden(),
//                    notificationDateTime,
//                    null,
//                    messageTemplate
//            );
//        }
        MessageTemplateDTO messageTemplate = messageTemplateService.generateMessage(4L,
                Map.of("medicine", dto.getMedicineBagTitle()));
        totalNotificationService.saveNotification(
                NotificationType.MEDICATION_REMINDER.getDescription(),
                user.getUserId(),
                user,
                false,
                dto.getHidden(),
                notificationDateTime,
                null,
                messageTemplate
        );
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

    public String updateAllIntakeConfirmed(Long medicationManagementId) {
        MedicationManagementEntity medicationManagement = medicationManegementRepository.findById(medicationManagementId)
                .orElseThrow(() -> new CustomException("유효하지 않은 복약관리 정보입니다."));


        UserEntity byUserId = userRepository.findByUserId(medicationManagement.getMedicineBag().getUserId().getUserId());
        if (byUserId == null) {
            throw new CustomException("해당 회원이 존재하지 않습니다");
        }
        // 변경 전 상태 추적
        boolean wasTotalIntakeConfirmed = medicationManagement.isTotalIntakeConfirmed();

        // 모든 약의 intakeConfirmed를 true로 설정
        for (IntakeMedicineListEntity medicine : medicationManagement.getMedicineList()) {
            medicine.setIntakeConfirmed(true);
        }

        // totalIntakeConfirmed를 true로 설정
        medicationManagement.setIntakeConfirmed(true);

        medicationManegementRepository.save(medicationManagement);

        // 변경 감지 및 보상 로직
        if (!wasTotalIntakeConfirmed && medicationManagement.isTotalIntakeConfirmed()) {
            // 보상 생성
            RewardEntity reward = RewardEntity.builder()
                    .userId(byUserId)
                    .rewardPoint(100L) // 예: 100 포인트 부여
                    .rewardDate(LocalDateTime.now())
                    .acquisition_type("TotalIntakeConfirmed, " +" medicationManagementId : "+ medicationManagementId)
                    .build();

            // Reward 저장
            rewardRepository.save(reward);
            return "100포인트 적립";
        }
        return null;
    }
}
