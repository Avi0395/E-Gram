package com.egram.egram.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.egram.egram.dto.authDto.AuthResponseDto;
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
    public ResponseEntity<?> getAllCitizens() {
        try {
            List<CitizenResponseDto> list = citizenService.getAllCitizens();
            return ResponseEntity.ok(list);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch citizen list. Please try again later.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCitizen(
            @Valid @RequestBody CitizenRequestDto requestDto) {
        try {
            CitizenResponseDto responseDto = citizenService.registerCitizen(requestDto);
            return ResponseEntity.ok(responseDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred during registration.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCitizen(@Valid @RequestBody CitizenLoginRequestDto loginDto) {
        try {
            AuthResponseDto token = citizenService.loginCitizen(loginDto);
            return ResponseEntity.ok(token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Login failed due to server error.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutCitizen() {
        // Stateless logout – just clear from frontend (localStorage)
        return ResponseEntity.ok("Logout successful");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/notify/{id}")
    public ResponseEntity<?> notifyCitizen(@PathVariable Long id, @RequestBody String message) {
        try {
            String status = citizenService.sendMessage(id, message);
            return ResponseEntity.ok(status);
        } catch (IllegalArgumentException ie) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ie.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error");
        }
    }

}
