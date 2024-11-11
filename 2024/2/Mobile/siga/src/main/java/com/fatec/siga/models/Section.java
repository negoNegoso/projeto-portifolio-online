package com.fatec.siga.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fatec.siga.constants.enumeration.ClassroomEnumeration;
import com.fatec.siga.constants.enumeration.SectionStatus;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="sections")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private ClassroomEnumeration name_section;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="grade_id")
    private Grade grade;

    private SectionStatus status;

    @ManyToMany(mappedBy = "sections")
    @JsonIgnore
    private List<Teachers> teachers;
}