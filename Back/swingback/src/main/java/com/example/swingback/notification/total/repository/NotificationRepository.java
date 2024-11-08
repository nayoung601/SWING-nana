package com.example.swingback.notification.total.repository;

import com.example.swingback.notification.total.entity.TotalNotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<TotalNotificationEntity,Long> {

}
