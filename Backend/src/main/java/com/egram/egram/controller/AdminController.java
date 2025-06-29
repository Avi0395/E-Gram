package com.egram.egram.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.egram.egram.dto.adminDto.AdminLoginRequestDto;
import com.egram.egram.service.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping
    public ResponseEntity<String> loginAdmin(@Valid @RequestBody AdminLoginRequestDto adminLoginRequestDto) {
        if (adminService.loginAdmin(adminLoginRequestDto)) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
}
