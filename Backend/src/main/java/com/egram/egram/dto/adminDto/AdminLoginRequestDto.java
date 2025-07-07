package com.egram.egram.dto.adminDto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminLoginRequestDto {
    @NotBlank(message = "Username must be required")
    private String username;

    @NotBlank(message = "Password must be required")
    private String password;
}
