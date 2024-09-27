package com.fatec.siga.model.view;

import com.fatec.siga.constants.enumeration.SubjectEnum;
import com.fatec.siga.model.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SubjectBindingModel extends BaseModel {

    private SubjectEnum subject;
    private Long classroomId;
    private Long teacherId;
}
