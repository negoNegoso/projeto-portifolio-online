package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.Section;

public interface SectionRepository extends JpaRepository<Section,Long>{
    
}
