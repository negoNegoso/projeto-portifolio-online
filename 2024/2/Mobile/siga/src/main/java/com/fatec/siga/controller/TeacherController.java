package com.fatec.siga.controller;

import com.fatec.siga.models.Teachers;
import com.fatec.siga.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TeacherController {

    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/api/teachers/")
    public List<Teachers> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/api/teachers/{id}")
    public Teachers getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }

    @PostMapping("/api/teachers")
    public Teachers createTeacher(@RequestBody Teachers teacher) {
        return teacherService.createTeacher(teacher);
    }

    @PutMapping("/api/teachers/{id}")
    public Teachers updateTeacher(@PathVariable Long id, @RequestBody Teachers teacher) {
        return teacherService.updateTeacher(id, teacher);
    }

    @DeleteMapping("/api/teachers/{id}")
    public void deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
    }
  
    


}
