package com.example.swingback.medicine.medicinebag.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "medicine_notification_time")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NotificationTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_time_id")
    private Long notificationTimeId;

    @ManyToOne // 알림 시간이 속한 약 봉투
    @JoinColumn(name = "medicine_bag_id", nullable = false)
    private MedicineBagEntity medicineBag;

    @Column(name = "notification_time") // 알림 시간
    private LocalDateTime notificationTime;

}
