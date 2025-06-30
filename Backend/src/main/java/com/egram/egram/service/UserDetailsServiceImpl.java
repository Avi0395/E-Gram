package com.egram.egram.service;

import com.egram.egram.model.Citizen;
import com.egram.egram.repository.CitizenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final CitizenRepository citizenRepository;

    @Override
    public UserDetails loadUserByUsername(String aadhaarNumber) throws UsernameNotFoundException {
        Citizen citizen = citizenRepository.findByAadhaarNumber(aadhaarNumber)
                .orElseThrow(() -> new UsernameNotFoundException("Citizen not found"));

        return new User(
                citizen.getAadhaarNumber(),
                "", // No password since login is based on DOB, unless encrypted login used
                Collections.singleton(new SimpleGrantedAuthority("ROLE_CITIZEN"))
        );
    }
}
