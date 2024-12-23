package com.fatec.siga.controller;

import com.fatec.siga.models.Section;
import com.fatec.siga.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class SectionController {
    private final SectionService sectionService;
    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping("/api/sections")
    public ResponseEntity<List<Section>> getAllSections() {
        List<Section> sections = sectionService.getAllSections();
        return ResponseEntity.ok(sections);
    }

    @PatchMapping("/api/sections/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable Long id, @RequestBody Section updatedSection) {
        Section updated = sectionService.updateSection(id, updatedSection);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/sections/{section-id}")
    public ResponseEntity<Section> getSectionById(@PathVariable Long id) {
        return sectionService.getSectionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
   
    @PostMapping("/api/sections")
    public ResponseEntity<Section> saveSection(@RequestBody Section section) {
        Section savedSection = sectionService.saveSection(section);
        return ResponseEntity.ok(savedSection);
    }

    @DeleteMapping("/api/sections/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{sectionId}/add-teachers")
    public ResponseEntity<?> addTeachersToSection(@PathVariable Long sectionId, @RequestBody List<Long> teacherIds) {
         sectionService.addTeachersToSection(sectionId, teacherIds);
         return ResponseEntity.ok().build();
    }
    @PostMapping("/{sectionId}/remove-teachers")
    public ResponseEntity<?> removeTeachersFromSection(@PathVariable Long sectionId, @RequestBody List<Long> teacherIds) {
         sectionService.removeTeachersFromSection(sectionId, teacherIds);
         return ResponseEntity.ok().build();
    }

}