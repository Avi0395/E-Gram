package com.egram.egram.dto.citizenDto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CitizenResponseDto {

    private Long id;

    private String aadhaarNumber;
    private String firstName;
    private String lastName;
    private String fatherName;
    private LocalDate dob;
    private Gender gender;
    private String mobileNo;
    private String houseNo;

    public enum Gender {
        MALE,
        FEMALE,
        OTHER
    }
}
