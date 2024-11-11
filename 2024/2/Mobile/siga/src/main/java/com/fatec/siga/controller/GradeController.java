package com.fatec.siga.controller;

import com.fatec.siga.models.Classroom;
import com.fatec.siga.models.Grade;
import com.fatec.siga.models.Section;
import com.fatec.siga.service.ClassroomService;
import com.fatec.siga.service.GradeService;
import com.fatec.siga.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class GradeController {

    private final GradeService gradeService;
    private final ClassroomService classroomService;
    private final SectionService sectionService;

    @Autowired
    public GradeController(GradeService gradeService, ClassroomService classroomService, SectionService sectionService)
    {
        this.gradeService = gradeService;
        this.classroomService = classroomService;
        this.sectionService = sectionService;
    }

    @GetMapping("/api/grades")
    public ResponseEntity<List<Grade>> getAllGrades() {
        List<Grade> grades = gradeService.getAllGrades();
        return ResponseEntity.ok(grades);
    }
    @GetMapping("/api/classrooms/grade={id}")
    public ResponseEntity<List<Classroom>> getAllClassroomsByGradeId(@PathVariable Long id) {
        return ResponseEntity.ok(classroomService.findByGrade(id));
    }

    @GetMapping("/api/grades/{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Long id) {
        return gradeService.getGradeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/api/grades")
    public ResponseEntity<Grade> saveGrade(@RequestBody Grade grade) {
        Grade savedGrade = gradeService.saveGrade(grade);
        return ResponseEntity.ok(savedGrade);
    }

    @PatchMapping("/api/grades/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable Long id, @RequestBody Grade updatedGrade) {
        Grade updated = gradeService.updateGrade(id, updatedGrade);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}