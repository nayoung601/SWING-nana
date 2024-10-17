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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 사용자의 인증 정보를 가져와서 반환
        String name = authentication.getName();
        return new UserInfo(name);
    }

    @GetMapping("/api/userdata")
    public ResponseEntity<UserData> getUserData() {
        UserData userData = userService.findByProvider();
        return (userData != null) ?
                ResponseEntity.status(HttpStatus.OK).body(userData) :
    //            ResponseEntity.ok(userData):
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
}
