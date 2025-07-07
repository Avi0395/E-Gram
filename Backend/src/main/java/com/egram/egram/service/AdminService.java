package com.egram.egram.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.egram.egram.dto.adminDto.AdminLoginRequestDto;
import com.egram.egram.dto.authDto.AuthResponseDto;
import com.egram.egram.model.Admin;

@Service
public class AdminService {

    private final JwtService jwtService;

    public AdminService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    // public AuthResponseDto loginAdmin(AdminLoginRequestDto loginRequestDto) {
    // if (Admin.authenticate(loginRequestDto.getUsername(),
    // loginRequestDto.getPassword())) {
    // UserDetails user = new User(
    // loginRequestDto.getUsername(),
    // "", // no password stored or needed
    // Collections.emptyList() // or use roles if needed
    // );
    // String token = jwtService.generateToken(user);
    // return new AuthResponseDto(token);
    // } else {
    // throw new IllegalArgumentException("Invalid admin credentials");
    // }
    // }

    public AuthResponseDto loginAdmin(AdminLoginRequestDto dto) {
        if (Admin.authenticate(dto.getUsername(), dto.getPassword())) {
            UserDetails userDetails = new User(
                    dto.getUsername(),
                    "",
                    List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));

            Map<String, Object> claims = new HashMap<>();
            claims.put("authorities", List.of("ROLE_ADMIN")); // <-- this is critical!

            String token = jwtService.generateToken(claims, userDetails);
            return new AuthResponseDto(token);
        } else {
            throw new IllegalArgumentException("Invalid admin credentials");
        }
    }

}
