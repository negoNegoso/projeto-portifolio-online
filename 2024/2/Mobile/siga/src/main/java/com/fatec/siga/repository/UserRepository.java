package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.User;

public interface UserRepository extends JpaRepository<User,Long> {
    
}
