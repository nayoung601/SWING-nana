package com.example.swingback.batch.common;

import com.example.swingback.medicine.medicationmanagement.entity.MedicationManagementEntity;
import com.example.swingback.medicine.medicationmanagement.repository.MedicationManegementRepository;
import com.example.swingback.notification.total.service.TotalNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.batch.item.data.builder.RepositoryItemWriterBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.PlatformTransactionManager;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class NotificationBatch {


    private final JobRepository jobRepository;
    private final PlatformTransactionManager platformTransactionManager;
    private final MedicationManegementRepository medicationManagementRepository;
    private final TotalNotificationService notificationService; // 알림 전송 서비스

    @Bean
    public Job notificationJob() {
        log.info("notificationJob");
        return new JobBuilder("notificationJob", jobRepository)
                .start(notificationStep())
                .build();
    }

    @Bean
    public Step notificationStep() {
        log.info("first step");

        return new StepBuilder("notificationStep", jobRepository)
                .<MedicationManagementEntity, MedicationManagementEntity>chunk(10, platformTransactionManager)
                .reader(medicationReader())
                .processor(medicationProcessor())
                .writer(medicationWriter())
                .build();
    }

    @Bean
    public RepositoryItemReader<MedicationManagementEntity> medicationReader() {
        return new RepositoryItemReaderBuilder<MedicationManagementEntity>()
                .name("medicationReader")
                .repository(medicationManagementRepository)
                .methodName("findByNotificationDateAndNotificationTime")
                .arguments(LocalDate.now(), LocalTime.now()) // 현재 날짜와 시간으로 조회
                .sorts(Map.of("medicationManagementId", Sort.Direction.ASC))
                .build();
    }

    @Bean
    public ItemProcessor<MedicationManagementEntity, MedicationManagementEntity> medicationProcessor() {
        return item -> {
            // 복용 확인 상태가 false일 경우에만 알림을 전송
            if (!item.isTotalIntakeConfirmed()) {
//                notificationService.saveNotification(item);
            }
            return item; // 엔티티를 그대로 반환
        };
    }

    @Bean
    public RepositoryItemWriter<MedicationManagementEntity> medicationWriter() {
        return new RepositoryItemWriterBuilder<MedicationManagementEntity>()
                .repository(medicationManagementRepository)
                .methodName("save")
                .build();
    }

}
