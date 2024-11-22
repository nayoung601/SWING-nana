package com.example.swingback.healthcare.healthinfo.repository;

import com.example.swingback.healthcare.healthinfo.entity.HealthcareEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthcareRepository extends JpaRepository<HealthcareEntity,Long> {
}
