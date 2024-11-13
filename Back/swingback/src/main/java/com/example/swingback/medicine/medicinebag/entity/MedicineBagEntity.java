package com.example.swingback.medicine.medicinebag.entity;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.medicine.medicineinput.entity.MedicineInputEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "medicine_bag")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MedicineBagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_bag_id")
    private Long medicineBagId;

    @ManyToOne // 약 봉투를 등록한 회원의 id
    @JoinColumn(name = "user_id")
    private UserEntity userId;

    @Column(name = "registration_date", nullable = false) // 약 등록 날짜
    private LocalDate registrationDate;

    @Column(name = "end_date") // 복용 마지막 날짜
    private LocalDate endDate;

    @Column(name = "medicine_bag_title", nullable = false) // 약봉투 타이틀
    private String medicineBagTitle;

    @Column(name = "total_intake_confirmed", nullable = false)
    private boolean totalIntakeConfirmed;

    /*
    MedicineInput 목록 설정 (양방향 관계
    mappedBy= "medicineBag"는 MedicineInputEntity의 필드명이랑 일치해야함
    cascade = ALL을 사용해서 약봉투와 입력한 약이 같은 라이프사이클을 가지도록 설정
    약봉투(부모)가 사라졌을 떄 입력한 약(자식)이 혼자 남는 상황 방지 하기 위해서 orphanRemoval = true 사용
     */
    @OneToMany(mappedBy = "medicineBag", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MedicineInputEntity> medicinesInput;

    // 알림 시간 목록 설정
    @OneToMany(mappedBy = "medicineBag", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NotificationTimeEntity> notificationTimes;

    //가족에게 보여줄지 안보여줄지 설정
    @Column(name = "hidden")
    private boolean hidden;

}
