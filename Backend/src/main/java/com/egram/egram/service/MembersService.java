package com.egram.egram.service;

import java.util.ArrayList;
import java.util.List;

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
                .orElseThrow(() -> new IllegalArgumentException("Member was not found with this id"));

        member.setFullName(memberDto.getFullName().trim());
        member.setDesignation(memberDto.getDesignation());

        Members updated = membersRepository.save(member);

        return new MemberDto(updated.getId(), updated.getFullName(), updated.getDesignation());
    }

    public List<MemberDto> getAllMembers() {
        List<Members> memberList = membersRepository.findAll();
        if (memberList.isEmpty()) {
            throw new IllegalArgumentException("Members not found");
        }
        List<MemberDto> memberDtoList = new ArrayList<>();

        for (Members member : memberList) {
            MemberDto memberDto = new MemberDto();
            memberDto.setId(member.getId());
            memberDto.setFullName(member.getFullName());
            memberDto.setDesignation(member.getDesignation());
            memberDtoList.add(memberDto);
        }

        return memberDtoList;
    }
}
