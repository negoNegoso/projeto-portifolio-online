package com.fatec.siga.service.impl;

import com.fatec.siga.models.Teachers;
import com.fatec.siga.repository.TeacherRepository;
import com.fatec.siga.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherServiceImp implements TeacherService {
    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherServiceImp(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public List<Teachers> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Teachers getTeacherById(Long id) {
        Optional<Teachers> teacherOptional = teacherRepository.findById(id);
        return teacherOptional.orElse(null);
    }

    @Override
    public Teachers createTeacher(Teachers teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Teachers updateTeacher(Long id, Teachers teacher) {
        if (teacherRepository.existsById(id)) {
            teacher.setId(id);
            return teacherRepository.save(teacher);
        }
        return null;
    }

    @Override
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }  
}
