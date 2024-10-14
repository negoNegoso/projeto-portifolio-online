package com.fatec.siga.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fatec.siga.models.entity.Student;
import com.fatec.siga.service.StudentService;

@Controller
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/support")
    public ResponseEntity<String> viewSupportPage() { 
        return ResponseEntity.ok("Welcome to the Support Page"); // Returning a simple message
    }

    @GetMapping("/")  
    public ResponseEntity<List<Student>> viewHomePage() { 
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/showNewStudentForm")
    public ResponseEntity<Student> showNewStudentForm() {
        Student student = new Student();
        return ResponseEntity.ok(student);
    }

    @PostMapping("/saveStudent")
    public ResponseEntity<Void> saveStudent(@RequestBody Student student) {
        studentService.saveStudent(student);
        return ResponseEntity.created(null).build(); // Adjust the URI as needed
    }

    @GetMapping("/showFormForUpdate")
    public ResponseEntity<Student> showFormForUpdate(@RequestParam(value = "id") Long id) {
        Student student = studentService.getStudentById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid student Id:" + id));
        return ResponseEntity.ok(student);
    }

    @DeleteMapping("/deleteStudent")
    public ResponseEntity<Void> deleteStudent(@RequestParam(value = "id") Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }
}
