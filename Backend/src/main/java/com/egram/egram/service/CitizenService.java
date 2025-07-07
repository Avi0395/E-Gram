package com.egram.egram.service;

import com.egram.egram.dto.authDto.AuthResponseDto;
import com.egram.egram.dto.citizenDto.CitizenLoginRequestDto;
import com.egram.egram.dto.citizenDto.CitizenRequestDto;
import com.egram.egram.dto.citizenDto.CitizenResponseDto;
import com.egram.egram.model.Citizen;
import com.egram.egram.repository.CitizenRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

import java.util.Collections;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class CitizenService {

    private final CitizenRepository citizenRepository;
    private final JwtService jwtService;

    public CitizenService(CitizenRepository citizenRepository, JwtService jwtService) {
        this.citizenRepository = citizenRepository;
        this.jwtService = jwtService;
    }

    // get citizens
    public List<CitizenResponseDto> getAllCitizens() {
        List<CitizenResponseDto> responseList = new ArrayList<>();
        List<Citizen> citizenList = new ArrayList<>();

        citizenList = citizenRepository.findAll();

        for (Citizen citizen : citizenList) {
            responseList.add(convertToResponseDto(citizen));
        }

        return responseList;
    }

    // register citizen
    public CitizenResponseDto registerCitizen(CitizenRequestDto citizenRequestDto) {

        if (citizenRepository.existsByAadhaarNumber(citizenRequestDto.getAadhaarNumber())) {
            throw new IllegalArgumentException("A citizen with this Aadhaar number already exists");
        }

        Citizen citizen = new Citizen();
        citizen.setAadhaarNumber(citizenRequestDto.getAadhaarNumber());
        citizen.setFirstName(citizenRequestDto.getFirstName().trim());
        citizen.setLastName(citizenRequestDto.getLastName().trim());
        citizen.setFatherName(citizenRequestDto.getFatherName().trim());
        citizen.setDob(citizenRequestDto.getDob());
        citizen.setGender(Citizen.Gender.valueOf(citizenRequestDto.getGender().name()));
        citizen.setMobileNo(citizenRequestDto.getMobileNo().trim());
        citizen.setHouseNo(citizenRequestDto.getHouseNo().trim());

        Citizen saved = citizenRepository.save(citizen);

        return convertToResponseDto(saved);

    }

    // login citizen
    public AuthResponseDto loginCitizen(CitizenLoginRequestDto loginRequestDto) {
        Citizen login = citizenRepository.findByAadhaarNumber(loginRequestDto.getAadhaarNumber())
                .orElseThrow(() -> new IllegalArgumentException("Citizen not found with Aadhar"));

        if (!login.getDob().equals(loginRequestDto.getDob())) {
            throw new IllegalArgumentException("Date of birth does not match");
        }

        var userDetails = new User(
                login.getAadhaarNumber(),
                "", // password unused
                Collections.singleton(new SimpleGrantedAuthority("ROLE_CITIZEN")));

        String token = jwtService.generateToken(userDetails);
        return new AuthResponseDto(token);
    }

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    // Send message to citizen
    public String sendMessage(Long id, String messageText) {
        Citizen citizen = citizenRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Citizen not found with id: " + id));

        Twilio.init(accountSid, authToken);
        String phoneNumber = "+91" + citizen.getMobileNo();

        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(phoneNumber),
                new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                messageText).create();

        return "Message sent to Successfully";
    }

    // convert to response object
    public static CitizenResponseDto convertToResponseDto(Citizen citizen) {
        CitizenResponseDto response = new CitizenResponseDto();
        response.setId(citizen.getId());
        response.setAadhaarNumber(citizen.getAadhaarNumber());
        response.setFirstName(citizen.getFirstName());
        response.setLastName(citizen.getLastName());
        response.setFatherName(citizen.getFatherName());
        response.setDob(citizen.getDob());
        response.setGender(CitizenResponseDto.Gender.valueOf(citizen.getGender().name()));
        response.setMobileNo(citizen.getMobileNo());
        response.setHouseNo(citizen.getHouseNo());

        return response;
    }
}
