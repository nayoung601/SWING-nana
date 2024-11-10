package com.example.swingback.medicine.medicineinput.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medicine_input")
public class MedicineInput {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registeredMedicineId")
    private Long registeredMedicineId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "약봉투_id", nullable = false)
    private MedicationPouch medicationPouch;

    @Column(name = "약이름", nullable = false)
    private String medicationName;

    @Column(name = "1회_섭취횟수", nullable = false)
    private int dosagePerIntake;

    @Column(name = "복용확인", nullable = false)
    private boolean intakeConfirmed;
}
