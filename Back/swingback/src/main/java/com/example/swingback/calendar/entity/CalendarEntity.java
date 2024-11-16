package com.example.swingback.calendar.entity;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.calendar.repository.TargetMonthRepository;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "calendar")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CalendarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calendarId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userId;

    @Column
    private String calendarTitle;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private String calendarTargetCode;

    @Column
    private String displayDate;

    @OneToMany(mappedBy = "calendarId") // TargetMonthEntity에서 연결된 필드명 입력(calendarId)
    private List<TargetMonthEntity> targetMonthList;



}
