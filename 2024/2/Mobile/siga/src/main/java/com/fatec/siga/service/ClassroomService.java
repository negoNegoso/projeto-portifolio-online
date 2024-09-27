package com.fatec.siga.service;


import java.util.*;
import com.fatec.siga.model.service.ClassroomServiceModel;


public interface ClassroomService {

    boolean createClassroom(ClassroomServiceModel model);

    List<ClassroomServiceModel> getAll();

    ClassroomServiceModel getById(Long id);

    long getClassroomsCount();
}
