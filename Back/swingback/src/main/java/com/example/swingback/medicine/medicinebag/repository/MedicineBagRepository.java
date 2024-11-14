package com.example.swingback.medicine.medicinebag.repository;

import com.example.swingback.medicine.medicinebag.entity.MedicineBagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MedicineBagRepository extends JpaRepository<MedicineBagEntity,Long> {
    @Query("SELECT m FROM MedicineBagEntity m WHERE m.userId.userId = :userId AND :date BETWEEN m.registrationDate AND m.endDate")
    List<MedicineBagEntity> findByUserIdAndDateBetween(@Param("userId") Long userId, @Param("date") LocalDate date);

}
