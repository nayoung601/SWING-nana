package com.example.swingback.family.existingcode.controller;

import com.example.swingback.error.CustomException;
import com.example.swingback.family.existingcode.dto.FamilyRegisterRequestDTO;
import com.example.swingback.family.existingcode.dto.FamilyRegisterResponseDTO;
import com.example.swingback.family.existingcode.service.FamilyRegisterRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FamilyRegisterController {

    private final FamilyRegisterRequestService familyRegisterRequestService;

    @PostMapping("/api/code/request")
    public void familyRegisterRequest(@RequestBody FamilyRegisterRequestDTO familyRegisterRequestDTO) {
        log.info("familyCode : "+ familyRegisterRequestDTO.getFamilyCode() +
                " RequesterUserId : "+ familyRegisterRequestDTO.getRequestUserId());
//        log.info("Received request: {}", familyRegisterRequestDTO);
        familyRegisterRequestService.findFamilyIdAndRequest(familyRegisterRequestDTO);
    }

    @PostMapping("/api/code/request/accept")
    public void familyRegisterRequestAccept(@RequestBody FamilyRegisterResponseDTO familyRegisterResponseDTO) {
        log.info("Received response: {}",familyRegisterResponseDTO.toString());
        if (familyRegisterResponseDTO.getAcceptOrReject()) {
            familyRegisterRequestService.requestAccept(familyRegisterResponseDTO);
        }
    }
    @PostMapping("/api/code/request/reject")
    public void familyRegisterRequestReject(@RequestBody FamilyRegisterResponseDTO familyRegisterResponseDTO) {
        log.info("Received response: {}",familyRegisterResponseDTO.toString());
        if (familyRegisterResponseDTO.getAcceptOrReject()) {
            familyRegisterRequestService.requestAccept(familyRegisterResponseDTO);
        }
    }

    @ExceptionHandler(CustomException.class) // 코드가 없을경우 400 에러 발생
    public ResponseEntity<String> handleUnauthorizedException(CustomException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
