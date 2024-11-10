package com.example.swingback.medicine.medicinebag.repository;

import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<MedicineBagEntity,Long> {

}
