package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.entity.Student;

public interface StudentRepository extends JpaRepository<Student,Long>{
    
}
