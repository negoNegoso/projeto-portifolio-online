package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.GradeNotes;

public interface GradeNotesRepository extends JpaRepository<GradeNotes, Long>{
    
}
