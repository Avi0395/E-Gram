// Updated UserDetailsServiceImpl.java
package com.egram.egram.service;

import com.egram.egram.model.Citizen;
import com.egram.egram.repository.CitizenRepository;
import jakarta.transaction.Transactional;
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
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("admin".equals(username)) {
            return new User(
                    "admin",
                    "",
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
        }

        Citizen citizen = citizenRepository.findByAadhaarNumber(username)
                .orElseThrow(() -> new UsernameNotFoundException("Citizen not found"));

        return new User(
                citizen.getAadhaarNumber(),
                "",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_CITIZEN"))
        );
    }
}
