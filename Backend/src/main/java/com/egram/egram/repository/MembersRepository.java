package com.egram.egram.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.egram.egram.model.Members;

public interface MembersRepository extends JpaRepository<Members,Long>  {
    
}
