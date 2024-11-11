package com.fatec.siga.service.impl;

import com.fatec.siga.models.Section;
import com.fatec.siga.models.Teachers;
import com.fatec.siga.repository.SectionRepository;
import com.fatec.siga.repository.TeacherRepository;
import com.fatec.siga.service.SectionService;
import javax.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;
    private final TeacherRepository teacherRepository;

    @Autowired
    public SectionServiceImpl(SectionRepository sectionRepository, TeacherRepository teacherRepository) {
        this.sectionRepository = sectionRepository;
        this.teacherRepository = teacherRepository;
    }

    @Override
    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

    @Override
    public Optional<Section> getSectionById(Long id) {
        return sectionRepository.findById(id);
    }

    @Override
    @Transactional
    public Section saveSection(Section section) {
        return sectionRepository.save(section);
    }
    @Override
    @Transactional
    public Section updateSection(Long id, Section updatedSection) {
        Optional<Section> existingSection = sectionRepository.findById(id);
        if (existingSection.isPresent()) {
            Section section = existingSection.get();
            // Update the fields of the section object with values from updatedSection
            section.setName_section(updatedSection.getName_section());
            return sectionRepository.save(section);
        }
        return null;
    }
    
    @Override
    public void deleteSection(Long id) {
        sectionRepository.deleteById(id);
    }
    @Override
    public void addTeachersToSection(Long sectionId, List<Long> teacherIds) {
         Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new EntityNotFoundException("Section not found"));
         List<Teachers> teachers = teacherRepository.findAllById(teacherIds);
         section.getTeachers().addAll(teachers);
         sectionRepository.save(section);
    }
    @Override
    public void removeTeachersFromSection(Long sectionId, List<Long> teacherIds) {
         Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new EntityNotFoundException("Section not found"));
         List<Teachers> teachers = teacherRepository.findAllById(teacherIds);
         section.getTeachers().removeAll(teachers);
         sectionRepository.save(section);
    }
}
