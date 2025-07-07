package com.egram.egram.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Members {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Full name is required")
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Designation designation;

    public enum Designation {
        SARPANCH,
        DEPUTY_SARPANCH,
        MEMBER,
        GRAMSEVAK,
        HELPER
    }

}
