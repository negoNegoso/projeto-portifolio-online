package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.Roles;

public interface RoleRepository extends JpaRepository<Roles, Long> {
    
}
