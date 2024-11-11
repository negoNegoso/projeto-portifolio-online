package com.fatec.siga.service;


import java.util.List;
import java.util.Optional;

import com.fatec.siga.models.Grade;

public interface GradeService {
    List<Grade> getAllGrades();
    Optional<Grade> getGradeById(Long id);

    Grade updateGrade(Long id, Grade updatedGrade);

    Grade saveGrade(Grade grade);
}
