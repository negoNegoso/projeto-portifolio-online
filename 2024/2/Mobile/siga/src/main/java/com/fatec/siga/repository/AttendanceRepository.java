package com.fatec.siga.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.siga.models.Attendances;

public interface AttendanceRepository extends JpaRepository<Attendances,Long> {
}

