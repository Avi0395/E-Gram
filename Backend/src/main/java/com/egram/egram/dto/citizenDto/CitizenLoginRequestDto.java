package com.egram.egram.dto.citizenDto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CitizenLoginRequestDto {

    @Pattern(regexp = "\\d{12}", message = "Aadhaar number must be 12 digits")
    @NotBlank(message = "Aadhaar number is required")
    private String aadhaarNumber;

    @NotNull(message = "Date of birth is required (format: yyyy-MM-dd)")
    private LocalDate dob;
}