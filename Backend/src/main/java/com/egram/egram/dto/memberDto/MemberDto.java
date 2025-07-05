package com.egram.egram.dto.memberDto;

import com.egram.egram.model.Members.Designation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String fullName;
    private Designation designation;

}