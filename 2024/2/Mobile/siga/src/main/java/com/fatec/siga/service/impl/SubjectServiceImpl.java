package com.fatec.siga.service.impl;

import com.fatec.siga.constants.enumeration.SubjectEnum;
import com.fatec.siga.exception.SubjectIdNotFoundException;
import com.fatec.siga.model.entity.SubjectEntity;
import com.fatec.siga.model.service.SubjectServiceModel;
import com.fatec.siga.repository.SubjectRepository;
import com.fatec.siga.service.SubjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl extends BaseService implements SubjectService {

    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectServiceImpl(ModelMapper modelMapper, SubjectRepository subjectRepository) {
        super(modelMapper);
        this.subjectRepository = subjectRepository;
    }

    @Override
    public SubjectServiceModel addSubject(SubjectServiceModel serviceModel) {
        SubjectEntity subjectEntity = modelMapper.map(serviceModel, SubjectEntity.class);
        SubjectEntity saved = this.subjectRepository.save(subjectEntity);
        return modelMapper.map(saved, SubjectServiceModel.class);
    }

    @Override
    public List<SubjectServiceModel> getAllSubjectsByClassId(Long id) {
        List<SubjectEntity> subjectEntities = subjectRepository.findAllByClassroomId(id);
        return subjectEntities
                .stream()
                .map(e -> modelMapper.map(e, SubjectServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteSubject(Long id) {
        subjectRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean subjectExists(SubjectEnum subject, Long groupId) {
        return subjectRepository.existsBySubjectAndClassroomId(subject, groupId);
    }

    @Override
    public SubjectServiceModel getSubjectById(Long id) {
        return this.subjectRepository
                .findById(id)
                .map(e -> modelMapper.map(e, SubjectServiceModel.class))
                .orElseThrow(SubjectIdNotFoundException::new);
    }

    @Override
    public SubjectServiceModel editSubject(SubjectServiceModel serviceModel) {
        return addSubject(serviceModel);
    }
}
