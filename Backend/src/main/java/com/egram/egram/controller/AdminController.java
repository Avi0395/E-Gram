package com.egram.egram.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.egram.egram.dto.adminDto.AdminLoginRequestDto;
import com.egram.egram.dto.authDto.AuthResponseDto;
import com.egram.egram.service.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@Valid @RequestBody AdminLoginRequestDto loginDto) {
        try {
            AuthResponseDto token = adminService.loginAdmin(loginDto);
            return ResponseEntity.ok(token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Login failed due to server error.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutAdmin() {
        // Stateless logout – just clear from frontend (localStorage)
        return ResponseEntity.ok("Logout successful");
    }

}
