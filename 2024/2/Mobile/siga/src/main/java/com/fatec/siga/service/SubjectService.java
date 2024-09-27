package com.fatec.siga.service;

import com.fatec.siga.constants.enumeration.SubjectEnum;
import com.fatec.siga.model.service.SubjectServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubjectService {

    SubjectServiceModel addSubject(SubjectServiceModel serviceModel);

    List<SubjectServiceModel> getAllSubjectsByClassId(Long id);

    boolean deleteSubject(Long id);

    boolean subjectExists(SubjectEnum subject, Long groupId);

    SubjectServiceModel getSubjectById(Long id);

    SubjectServiceModel editSubject(SubjectServiceModel serviceModel);
}
