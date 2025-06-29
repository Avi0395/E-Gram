package com.egram.egram.service;

import org.springframework.stereotype.Service;

import com.egram.egram.dto.adminDto.AdminLoginRequestDto;
import com.egram.egram.model.Admin;

@Service
public class AdminService {
    
    public boolean loginAdmin(AdminLoginRequestDto adminLoginRequestDto){
        return Admin.authenticate(adminLoginRequestDto.getUsername().trim(), adminLoginRequestDto.getPassword().trim());
    }
}
