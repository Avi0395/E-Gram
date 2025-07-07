package com.egram.egram.dto.citizenDto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CitizenRequestDto {

    @Pattern(regexp = "\\d{12}", message = "Aadhaar number must be 12 digits")
    @NotBlank(message = "Aadhaar number is required")
    private String aadhaarNumber;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Father name is required")
    private String fatherName;

    @Past(message = "Date of birth must be in the past")
    @NotNull(message = "Date of birth is required")
    private LocalDate dob;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
    private String mobileNo;

    @NotBlank(message = "House number is required")
    private String houseNo;

    public enum Gender {
        MALE,
        FEMALE,
        OTHER
    }
}
