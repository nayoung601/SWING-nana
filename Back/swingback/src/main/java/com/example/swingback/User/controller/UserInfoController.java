package com.example.swingback.User.controller;


import com.example.swingback.User.Service.UserService;
import com.example.swingback.User.dto.UserData;
import com.example.swingback.User.dto.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserInfoController {
    private final UserService userService;

    @GetMapping("/api/main")
    public UserInfo getUserInfo() {

        //SecurityContextHolder를 사용해서 현재 로그인한 이용자 정보 확인
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 사용자의 인증 정보를 가져와서 반환
        String name = authentication.getName();
        return new UserInfo(name);
    }

    
    //현재 로그인한 ProviderId를 통해서 유저를 인증하고 쿠키생성하기 위한 컨트롤러
    // UserData에 familyRole을 포함시켜서 null이면 추가정보 입력시키고  null이 아니면 main페이지로 이동시키는 용도임
    @GetMapping("/api/userdata")
    public ResponseEntity<UserData> getUserData() {
        UserData userData = userService.findByProvider();
        return (userData != null) ?
                ResponseEntity.status(HttpStatus.OK).body(userData) :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
}
