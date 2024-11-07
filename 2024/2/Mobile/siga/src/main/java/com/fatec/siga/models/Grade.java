package com.fatec.siga.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String nameGrade;
    private String notes;
    @OneToMany(mappedBy = "grade",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Section> sectionList;

    @OneToMany(mappedBy = "grade",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Classroom> classroomsList;
}