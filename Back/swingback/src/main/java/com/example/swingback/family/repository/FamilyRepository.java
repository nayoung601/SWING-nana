package com.example.swingback.family.repository;

import com.example.swingback.family.entity.FamilyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyRepository extends JpaRepository<FamilyEntity,String> {
}
