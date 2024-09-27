package com.fatec.siga.model.service;

import com.fatec.siga.constants.enumeration.SubjectEnum;
import com.fatec.siga.model.BaseModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectServiceModel extends BaseModel{

    private SubjectEnum subject;
    private ClassroomServiceModel classroom;
    private TeacherServiceModel teacher;


   
}