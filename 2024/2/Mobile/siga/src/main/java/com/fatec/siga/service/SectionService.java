package com.fatec.siga.service;


import java.util.List;
import java.util.Optional;

import com.fatec.siga.models.Section;

public interface SectionService {
    List<Section> getAllSections();
    Optional<Section> getSectionById(Long id);
    Section saveSection(Section section);
    Section updateSection(Long id, Section updatedSection);
    void deleteSection(Long id);
    void addTeachersToSection(Long sectionId, List<Long> teacherIds);
    void removeTeachersFromSection(Long sectionId, List<Long> teacherIds);
}
