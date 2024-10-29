package com.fatec.siga.service;

import java.util.List;
import java.util.Optional;

import com.fatec.siga.models.Classroom;

public interface ClassroomService {
    List<Classroom> getAllClassrooms();
    Optional<Classroom> getClassroomById(Long id);
    Classroom saveClassroom(Classroom classroom);
    List<Classroom> findByGrade(Long GradeId);
    Classroom updateClassroom(Long id, Classroom updatedClassroom);
}
