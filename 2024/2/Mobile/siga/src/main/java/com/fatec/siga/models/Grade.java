package com.fatec.siga.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fatec.siga.constants.enumeration.Sigla;
import com.fatec.siga.constants.enumeration.SubjectEnumeration;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="grade")
public class Grade implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private SubjectEnumeration nameGrade;    
    private Sigla sigla;

    @OneToMany(mappedBy = "grade",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Section> sectionList;

    @OneToMany(mappedBy = "grade",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Classroom> classroomsList;
}