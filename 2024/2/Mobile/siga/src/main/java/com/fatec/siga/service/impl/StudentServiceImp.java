package com.fatec.siga.service.impl;

import com.fatec.siga.models.Students;
import com.fatec.siga.repository.StudentRepository;
import com.fatec.siga.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class StudentServiceImp implements StudentService {
    private StudentRepository studentRepository;
    
    @Autowired
    public StudentServiceImp(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }
    
    @Override
    public Students saveStudent(Students student) {
        return studentRepository.save(student);
    }
    @Override
    public Students updateStudent(Long id, Students updatedStudent) {
        Optional<Students> existingStudent = studentRepository.findById(id);
        if (existingStudent.isPresent()) {
            Students student = existingStudent.get();
            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setAcademicYear(updatedStudent.getAcademicYear());
            //student.setAcademic_grade(updatedStudent.getAcademic_grade());
            student.setAttendanceList(updatedStudent.getAttendanceList());
            return studentRepository.save(student);
        } 
        return null;
    }
    @Override
    public Optional<Students> findById(Long id) {
        return studentRepository.findById(id);
    }
    @Override
    public List<Students> findAll() {
        return studentRepository.findAll();
    }
    
}
