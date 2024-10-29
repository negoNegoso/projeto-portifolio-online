package com.fatec.siga.controller;

import com.fatec.siga.models.Students;
import com.fatec.siga.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Students>> getAllStudents() {
        List<Students> students = studentService.findAll();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Students> getStudentById(@PathVariable Long id) {
        return studentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Students> saveStudent(@RequestBody Students student) {
        Students savedStudent = studentService.saveStudent(student);
        return ResponseEntity.ok(savedStudent);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<Students> updateStudent(@PathVariable Long id, @RequestBody Students updatedStudent) {
        Students updated = studentService.updateStudent(id, updatedStudent);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
