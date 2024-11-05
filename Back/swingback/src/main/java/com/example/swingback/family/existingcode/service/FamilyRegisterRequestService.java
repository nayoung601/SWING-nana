package com.example.swingback.family.existingcode.service;

import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.User.repository.UserRepository;
import com.example.swingback.error.CustomException;
import com.example.swingback.family.existingcode.dto.FamilyRegisterRequestDTO;
import com.example.swingback.family.existingcode.dto.FamilyRegisterResponseDTO;
import com.example.swingback.family.newcode.entity.FamilyEntity;
import com.example.swingback.family.newcode.repository.FamilyRepository;
import com.example.swingback.notification.token.entity.FCMTokenEntity;
import com.example.swingback.notification.token.repository.FCMTokenRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class FamilyRegisterRequestService {

    private final FamilyRepository familyRepository;
    private final UserRepository userRepository;
    private final FCMTokenRepository fcmTokenRepository;

    public void findFamilyIdAndRequest(FamilyRegisterRequestDTO familyRegisterRequestDTO) {
        //가족 코드가 db에 존재하는지 확인
        Optional<FamilyEntity> byFamilyId =
                familyRepository.findByFamilyId(familyRegisterRequestDTO.getFamilyCode());
        //가족코드 db에 존재하지 않으면 오류메시지 보내기
        if (byFamilyId.isEmpty()) {
            throw new CustomException("코드를 다시 확인해주세요 !");
        }
        // 가족 코드가 db에 존재하므로 가족 대표 id 가져옴
        Long familyRepresentativeId = byFamilyId.get().getFamilyRepresentative();
        List<FCMTokenEntity> allByUserId =
                fcmTokenRepository.findAllByUserId(userRepository.findByUserId(familyRepresentativeId));

        // 가장 최근의 recentUseDate가 있는 FCMTokenEntity 가져오기
        FCMTokenEntity latestTokenEntity = allByUserId.stream()
                .max(Comparator.comparing(FCMTokenEntity::getRecentUseDate))
                .orElse(null); // 리스트가 비어있을 경우 null 반환

        if (latestTokenEntity==null) {
            throw new CustomException("해당 회원은 알림을 받을 수 없는 상태입니다.");
        }
        //요청을 보내는 회원의 회원정보 가져오기
        UserEntity requestUserEntity =
                userRepository.findByUserId(familyRegisterRequestDTO.getRequestUserId());
        // 요청한 사용자 ID가 유효한지 확인
        if (requestUserEntity == null) {
            throw new CustomException("유효하지 않은 사용자입니다. 요청한 사용자를 확인해주세요.");
        }
        // 요청한 사용자 ID가 유효한지 확인
        if (requestUserEntity.getFamily() != null) {
            throw new CustomException("이미 가족에 가입되어있습니다.");
        }

        String body = requestUserEntity.getName()+"님의 요청";
        Map<String,String> data= new HashMap<>();
        data.put("name", requestUserEntity.getName());
        data.put("requestUserId",String.valueOf(requestUserEntity.getUserId()));
        data.put("url", "http://localhost:3000/alarm"); // 링크 추가

        // 파이어베이스 서버로 요청을 보낼 메시지 만들기
        Message message = Message.builder()
                .setToken(latestTokenEntity.getToken())
                .setNotification(Notification.builder()
                        .setTitle("가족 가입 요청")
                        .setBody(body)
                        .build())
                .putAllData(data)  //data를 메시지에 포함
                .build();
        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);
        } catch (FirebaseMessagingException e) {
            // FCM 관련 오류 처리
            log.error("FCM 메시지 전송 실패: {}", e.getMessage());
            throw new CustomException("알림 전송에 실패했습니다. 나중에 다시 시도해주세요.");
        } catch (Exception e) {
            // 기타 예외 처리
            log.error("알림 전송 중 오류 발생: {}", e.getMessage());
            throw new CustomException("알림 전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }


    }

    public void requestAccept(FamilyRegisterResponseDTO familyRegisterResponseDTO) {
        // dto에서 받아온 응답회원의 가족 entity를 찾아와서 반환
        FamilyEntity byFamilyRepresentative =
                familyRepository.findByFamilyRepresentative(familyRegisterResponseDTO.getResponseUserId());
        // dto에서 받아온 요청회원의 유저테이블 entity를 찾아와 반환
        UserEntity byUserId =
                userRepository.findByUserId(familyRegisterResponseDTO.getRequestUserId());
        //해당 유저를 응답회원의 가족으로 업데이트 후 회원을 db에저장
        byUserId.updateFamily(byFamilyRepresentative);
        userRepository.save(byUserId);

        // 요청회원에게 메시지를 보내기위해(누가 보낸건지 확인용) 응답회원의 정보 유저테이블에서 찾아오기
        UserEntity responseUserEntity =
                userRepository.findByUserId(familyRegisterResponseDTO.getResponseUserId());

        List<FCMTokenEntity> allByUserId =
                fcmTokenRepository.findAllByUserId(userRepository.findByUserId(familyRegisterResponseDTO.getRequestUserId()));

        // 가장 최근의 recentUseDate가 있는 FCMTokenEntity 가져오기
        FCMTokenEntity latestTokenEntity = allByUserId.stream()
                .max(Comparator.comparing(FCMTokenEntity::getRecentUseDate))
                .orElse(null); // 리스트가 비어있을 경우 null 반환

        if (latestTokenEntity==null) {
            throw new CustomException("해당 회원은 알림을 받을 수 없는 상태입니다.");
        }
        
        
        String body = responseUserEntity.getName()+"님의 응답";
        Map<String,String> data= new HashMap<>();
        data.put("name", responseUserEntity.getName());
        data.put("url", "http://localhost:3000/alarm"); // 링크 추가

        // 파이어베이스 서버로 요청을 보낼 메시지 만들기
        Message message = Message.builder()
                .setToken(latestTokenEntity.getToken())
                .setNotification(Notification.builder()
                        .setTitle("가족 요청 승인")
                        .setBody(body)
                        .build())
                .putAllData(data)  //data를 메시지에 포함````````````````````````````
                .build();
        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);
        } catch (FirebaseMessagingException e) {
            // FCM 관련 오류 처리
            log.error("FCM 메시지 전송 실패: {}", e.getMessage());
            throw new CustomException("알림 전송에 실패했습니다. 나중에 다시 시도해주세요.");
        } catch (Exception e) {
            // 기타 예외 처리
            log.error("알림 전송 중 오류 발생: {}", e.getMessage());
            throw new CustomException("알림 전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }

    }
}
