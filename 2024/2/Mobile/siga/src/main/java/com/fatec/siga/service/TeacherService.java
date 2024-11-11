package com.fatec.siga.service;


import java.util.List;

import com.fatec.siga.models.Teachers;

public interface TeacherService {
    List<Teachers> getAllTeachers();

    Teachers getTeacherById(Long id);

    Teachers createTeacher(Teachers teacher);

    Teachers updateTeacher(Long id, Teachers teacher);

    void deleteTeacher(Long id);
}
