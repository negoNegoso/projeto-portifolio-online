package com.fatec.siga.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fatec.siga.constants.enumeration.AttendanceStatus;
import com.fatec.siga.constants.enumeration.Sigla;
import com.fatec.siga.constants.enumeration.SubjectEnumeration;

import javax.persistence.*;
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
    
    // @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    // @JoinColumn(name = "grade_id")
    // @JsonBackReference
    // private Grade subject;

    private SubjectEnumeration subjectEnumeration;
    private Sigla sigla;

    private Date attendanceDate;
    
    private AttendanceStatus attendanceStatus;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Students student;

}