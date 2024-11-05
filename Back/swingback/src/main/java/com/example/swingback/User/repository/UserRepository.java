package com.example.swingback.User.repository;

import com.example.swingback.User.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    UserEntity findByProviderId(String providerId);

    UserEntity findByUserId(Long userId);

}
