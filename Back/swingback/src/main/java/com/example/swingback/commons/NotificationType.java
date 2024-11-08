package com.example.swingback.commons;


public enum NotificationType {
    FAMILY_REQUEST("가족 요청 알림"),
    FAMILY_APPROVED("가족 승인 알림"),
    FAMILY_DENIED("가족 거부 알림"),
    MEDICATION_REMINDER("약 먹을 시간 알림");

    private final String description;

    NotificationType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
