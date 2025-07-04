package com.egram.egram.service;

import org.springframework.stereotype.Service;

import com.egram.egram.dto.memberDto.MemberDto;
import com.egram.egram.model.Members;
import com.egram.egram.repository.MembersRepository;

@Service
public class MembersService {

    private final MembersRepository membersRepository;

    public MembersService(MembersRepository membersRepository) {
        this.membersRepository = membersRepository;
    }

    public MemberDto updateMember(Long id, MemberDto memberDto) {
        Members member = membersRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Member was not found with this id"));


        member.setFullName(memberDto.getFullName());
        member.setDesignation(memberDto.getDesignation());

        Members updated=membersRepository.save(member);
       
        return new MemberDto(updated.getFullName(),updated.getDesignation());
    }
}
