package com.egram.egram.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.egram.egram.dto.citizenDto.CitizenLoginRequestDto;
import com.egram.egram.dto.citizenDto.CitizenRequestDto;
import com.egram.egram.dto.citizenDto.CitizenResponseDto;
import com.egram.egram.service.CitizenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenService citizenService;

    public CitizenController(CitizenService cititzenService) {
        this.citizenService = cititzenService;
    }

    @GetMapping
    public ResponseEntity<List<CitizenResponseDto>> getAllCitizens() {
        List<CitizenResponseDto> list = citizenService.getAllCitizens();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<CitizenResponseDto> registerCitizen(@Valid @RequestBody CitizenRequestDto citizenRequestDto) {
        CitizenResponseDto citizenResponseDto = citizenService.registerCitizen(citizenRequestDto);
        return ResponseEntity.ok(citizenResponseDto);
    }

    @PostMapping("login")
    public ResponseEntity<CitizenResponseDto> loginCitizen(
            @Valid @RequestBody CitizenLoginRequestDto citizenRequestDto) {
        CitizenResponseDto citizenResponseDto = citizenService.loginCitizen(citizenRequestDto);
        return ResponseEntity.ok(citizenResponseDto);
    }

}
