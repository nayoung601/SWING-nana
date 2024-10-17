package com.example.swingback.oauth.service;


import com.example.swingback.User.entity.UserEntity;
import com.example.swingback.User.repository.UserRepository;
import com.example.swingback.oauth.dto.CustomOAuth2User;
import com.example.swingback.oauth.dto.KakaoResponse;
import com.example.swingback.oauth.dto.NaverResponse;
import com.example.swingback.oauth.dto.OAuth2Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("oAuth2User : "+oAuth2User.getAttributes());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("kakao")) {

            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else {

            return null;
        }
        String role = "ROLE_USER";
        String providerId = oAuth2Response.getProviderId();
//        String provider = oAuth2Response.getProvider();
        UserEntity existData = userRepository.findByProviderId(providerId);

        if (existData == null) {
            UserEntity userEntity = UserEntity.builder()
                    .providerId(providerId)
                    .email(oAuth2Response.getEmail())
                    .name(oAuth2Response.getNickname())
                    .role(role)
                    .provider(oAuth2Response.getProvider())
                    .build();
            userRepository.save(userEntity);
        } else {
            existData.updateProfile(
                    oAuth2Response.getNickname()
                    ,oAuth2Response.getEmail()
                    ,role);
            userRepository.save(existData);
        }

        return new CustomOAuth2User(oAuth2Response, role);
    }
}