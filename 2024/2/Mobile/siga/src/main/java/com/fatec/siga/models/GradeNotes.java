package com.fatec.siga.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fatec.siga.constants.enumeration.SubjectEnumeration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="notes")
public class GradeNotes {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Students student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    @JsonBackReference
    private Grade grade;

    private SubjectEnumeration subject;

    private double atividade_um;
    private double atividade_dois;
    private double projeto_integrador;
    private double avaliacao_integradora;

    @Column(name = "media")
    private double media;
}
