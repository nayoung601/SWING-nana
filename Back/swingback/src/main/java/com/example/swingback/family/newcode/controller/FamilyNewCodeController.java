package com.example.swingback.family.controller;

import com.example.swingback.error.UnauthorizedException;
import com.example.swingback.family.DTO.NewCodeDTO;
import com.example.swingback.family.service.FamilyNewCodeServivce;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FamilyNewCodeController {

    private final FamilyNewCodeServivce familyNewCodeServivce;

    @GetMapping("/api/family/code")
    public ResponseEntity<String> getNewCode() {

        NewCodeDTO code = familyNewCodeServivce.findByCodMyFamily();
        return (code.getFamilyId()!=null)?
                ResponseEntity.status(HttpStatus.OK).body(code.getFamilyId()):
                ResponseEntity.status(HttpStatus.OK).body(code.getNewCode());
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handleUnauthorizedException(UnauthorizedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

}
