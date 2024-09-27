package com.fatec.siga.model.service;

import com.fatec.siga.constants.enumeration.ClassroomLetter;
import com.fatec.siga.constants.enumeration.ClassroomNumber;
import com.fatec.siga.model.BaseModel;

import lombok.*;

import lombok.NoArgsConstructor;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassroomServiceModel extends BaseModel {

    private ClassroomNumber number;
    private ClassroomLetter letter;
    private List<SubjectServiceModel> subjects;
    private List<StudentServiceModel> students;


}
