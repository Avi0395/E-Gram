package com.egram.egram.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Citizen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aadhaar_number", unique = true, nullable = false, length = 12)
    @Pattern(regexp = "\\d{12}", message = "Aadhaar number must be 12 digits")
    private String aadhaarNumber;

    @Column(nullable = false)
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Column(nullable = false)
    @NotBlank(message = "Father name is required")
    private String fatherName;

    @Column(nullable = false)
    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false, length = 10)
    @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
    private String mobileNo;

    @Column(nullable = false)
    @NotBlank(message = "House number is required")
    private String houseNo;

    public enum Gender {
        MALE,
        FEMALE,
        OTHER
    }
}