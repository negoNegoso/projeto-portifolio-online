package com.fatec.siga.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="students")
public class Students{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "Date_Birth")
    private LocalDate dateOfBirth;

    @Column(name = "academic_year")
    private String academicYear;

    @OneToMany(mappedBy = "student",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Attendances> attendanceList;

    @Column(name = "academic_grade")
    private double academic_grade;

}
