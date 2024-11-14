package com.example.swingback.medicine.medicationmanagement.repository;

import com.example.swingback.medicine.medicationmanagement.entity.MedicationManagementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicationManegementRepository extends JpaRepository<MedicationManagementEntity,Long> {
}
