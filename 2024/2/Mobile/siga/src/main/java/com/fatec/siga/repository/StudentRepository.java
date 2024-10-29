package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.Students;

public interface StudentRepository extends JpaRepository<Students,Long> {
    
}
