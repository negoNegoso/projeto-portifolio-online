package com.fatec.siga.service;

import com.fatec.siga.constants.enumeration.SubjectEnum;
import com.fatec.siga.model.service.SubjectServiceModel;
import com.fatec.siga.model.service.TeacherServiceModel;
import com.fatec.siga.model.service.UserServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeacherService {
    TeacherServiceModel addTeacher(TeacherServiceModel serviceModel);

    List<TeacherServiceModel> getAllTeachers();

    TeacherServiceModel editTeacher(TeacherServiceModel serviceModel);

    TeacherServiceModel getTeacherById(Long id);

    boolean existByUserId(Long userId);

    TeacherServiceModel getTeacherByUsername(String username);

    void deleteTeacher(Long id);

    long getTeachersCount();

    List<UserServiceModel> getAllFreeTeachersUsers();

    boolean emailIsSame(TeacherServiceModel teacherServiceModel);
}
