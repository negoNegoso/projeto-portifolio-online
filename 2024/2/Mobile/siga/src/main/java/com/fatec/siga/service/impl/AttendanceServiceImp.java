package com.fatec.siga.service.impl;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.siga.models.Attendances;
import com.fatec.siga.repository.AttendanceRepository;
import com.fatec.siga.service.AttendanceService;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class AttendanceServiceImp implements AttendanceService {
    private final AttendanceRepository attendanceRepository;

    @Autowired
    public AttendanceServiceImp(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public List<Attendances> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    @Override
    public Optional<Attendances> getAttendanceById(Long id) {
        return attendanceRepository.findById(id);
    }

    @Override
    public Attendances saveAttendance(Attendances attendance) {
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendances updateAttendance(Long id, Attendances updatedAttendance) {
        Optional<Attendances> existingAttendance = attendanceRepository.findById(id);
        if (existingAttendance.isPresent()) {
            Attendances attendance = existingAttendance.get();
            attendance.setAttendanceDate(updatedAttendance.getAttendanceDate());
            attendance.setAttendanceStatus(updatedAttendance.getAttendanceStatus());
            attendance.setStudent(updatedAttendance.getStudent());
            // Update other fields as needed

            return attendanceRepository.save(attendance);
        }
        return null;
    }

    @Override
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

   
}
