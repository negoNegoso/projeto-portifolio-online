package com.fatec.siga.service.impl;


import javax.transaction.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.siga.models.Classroom;
import com.fatec.siga.models.Grade;
import com.fatec.siga.repository.ClassroomRepository;
import com.fatec.siga.repository.GradeRepository;
import com.fatec.siga.service.ClassroomService;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ClassroomServiceImp implements ClassroomService {
    private final ClassroomRepository classroomRepository;
    private final GradeRepository gradeRepository;

    @Autowired
    public ClassroomServiceImp(ClassroomRepository classroomRepository,GradeRepository gradeRepository) {
        this.classroomRepository = classroomRepository;
        this.gradeRepository = gradeRepository;
    }

    @Override
    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    @Override
    public Optional<Classroom> getClassroomById(Long id) {
        return classroomRepository.findById(id);
    }

    @Override
    public Classroom saveClassroom(Classroom classroom) {
        Grade grade = classroom.getGrade();
        if (grade.getId() == null) {
            grade = gradeRepository.save(grade);
            classroom.setGrade(grade); 
        }
        return classroomRepository.save(classroom);
    }

    @Override
    public List<Classroom> findByGrade(Long gradeId) {
        return classroomRepository.findClassroomByGradeId(gradeId);
    }

    @Override
    public Classroom updateClassroom(Long id, Classroom updatedClassroom) {
        Optional<Classroom> existingClassroom = classroomRepository.findById(id);
        if (existingClassroom.isPresent()) {
            Classroom classroom = existingClassroom.get();
            classroom.setNameOfClass(updatedClassroom.getNameOfClass());
            classroom.setGrade(updatedClassroom.getGrade());
            // Handle updating the Grade if necessary (similar to saveClassroom logic)

            return classroomRepository.save(classroom);
        } 
        return null;
    }
}
