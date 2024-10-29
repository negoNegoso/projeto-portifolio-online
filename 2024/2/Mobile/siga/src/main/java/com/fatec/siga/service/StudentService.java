package com.fatec.siga.service;


import java.util.List;
import java.util.Optional;

import com.fatec.siga.models.Students;

public interface StudentService {
    Students saveStudent(Students student);
    Students updateStudent(Long id, Students updatedStudent);
    Optional<Students> findById(Long id);
    List<Students>findAll();
}
