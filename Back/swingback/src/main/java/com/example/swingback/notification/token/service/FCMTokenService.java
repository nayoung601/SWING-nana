package com.example.swingback.notification.token.service;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.User.repository.UserRepository;
import com.example.swingback.error.UnauthorizedException;
import com.example.swingback.notification.token.dto.FCMTokenDTO;
import com.example.swingback.notification.token.entity.FCMTokenEntity;
import com.example.swingback.notification.token.repository.FCMTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FCMTokenService {

    private final FCMTokenRepository tokenRepository;
    private final UserRepository userRepository;

    @Transactional
    public void tokenSave(FCMTokenDTO fcmTokenDTO) {
        //SecurityContextHolder를 통해 현재 인증된 사용자의 정보를 Authentication에 생성
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        //인증된 사용자가 아니면 에러띄워주기
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("인증되지 않은 회원입니다");
        }
        UserEntity userEntity = userRepository.findByUserId(fcmTokenDTO.getUserId());

        Optional<FCMTokenEntity> existingToken =
                tokenRepository.findByTokenAndUserId(
                        fcmTokenDTO.getToken(),userEntity);
        // 새로운 TokenEntity 생성 및 저장
        if (existingToken.isEmpty()) {
            log.info("토큰이 존재하지 않습니다, 토큰을 저장합니다.");
            FCMTokenEntity tokenEntity = FCMTokenEntity.builder()
                    .userId(userEntity)
                    .token(fcmTokenDTO.getToken())
                    .recentUseDate(new Date())
                    .build();

            tokenRepository.save(tokenEntity);
        }else log.info("토큰이 존재합니다.");



    }
}
