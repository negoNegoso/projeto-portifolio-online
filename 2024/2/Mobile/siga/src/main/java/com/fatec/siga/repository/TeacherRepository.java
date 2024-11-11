package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.Teachers;

public interface TeacherRepository extends JpaRepository<Teachers, Long> {
    
}
