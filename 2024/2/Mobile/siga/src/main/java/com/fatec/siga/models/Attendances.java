package com.fatec.siga.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fatec.siga.constants.enumeration.AttendanceStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="attendance")
public class Attendances{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Date attendanceDate;
    
    private AttendanceStatus attendanceStatus;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Students student;

}