package com.example.swingback.family.entity;

import com.example.swingback.User.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "family")  // 테이블 이름 설정
public class FamilyEntity {
    @Id
    private String familyId; // 가족 고유 아이디 (PK)

    @Column(name = "family_create_date")
    private Date familyCreateDate;

    @OneToMany(mappedBy = "familyId") // UserEntity의 familyId와 연결
    private List<UserEntity> users; // FamilyEntity에 속한 UserEntity 리스트



}
