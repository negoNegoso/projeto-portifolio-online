package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.Grade;

public interface GradeRepository extends JpaRepository<Grade,Long> {

}
