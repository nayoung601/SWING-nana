package com.example.swingback.medicine.medicineinput.entity;

import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medicine_input")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicineInputEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registered_medicine_id")
    private Long registeredMedicineId;

    @ManyToOne // 약봉투 id
    @JoinColumn(name = "medicine_bag_id", nullable = false)
    private MedicineBagEntity medicineBag;

    @Column(name = "medicine_name", nullable = false) // 약이름
    private String medicineName;

    @Column(name = "dosage_per_intake", nullable = false) // 약 1회 섭취량
    private int dosagePerIntake;

    @Column(name = "intake_confirmed", nullable = false) // 약 복용확인
    private boolean intakeConfirmed;
}
