package com.fatec.siga.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fatec.siga.models.entity.Attendance;
import com.fatec.siga.service.AttendanceService;

@Controller
@RequestMapping("/attendance")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @GetMapping
    public ResponseEntity<List<Attendance>> viewAttendancePage() {
        List<Attendance> attendanceList = attendanceService.getAllAttendances();
        return ResponseEntity.ok(attendanceList);
    }

    @GetMapping("/add")
    public ResponseEntity<Attendance> showAddAttendanceForm() {
        Attendance attendance = new Attendance();
        return ResponseEntity.ok(attendance);
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveAttendance(@RequestBody Attendance attendance) {
        attendance.setDate(LocalDate.now());
        attendanceService.saveAttendance(attendance);
        return ResponseEntity.created(null).build(); // Adjust the URI as needed
    }

    @GetMapping("/edit/{id}")
    public ResponseEntity<Attendance> showEditAttendanceForm(@PathVariable Long id) {
        Attendance attendance = attendanceService.getAttendanceById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid attendance Id:" + id));
        return ResponseEntity.ok(attendance);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Void> updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
        attendance.setId(id); // Ensure the ID is set correctly
        attendanceService.saveAttendance(attendance);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.ok().build();
    }
}
