package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.Classroom;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom,Long> {
    List<Classroom> findClassroomByGradeId(Long gradeId);
}
