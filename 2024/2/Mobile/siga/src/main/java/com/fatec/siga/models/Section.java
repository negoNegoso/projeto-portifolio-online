package com.fatec.siga.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fatec.siga.constants.enumeration.SectionStatus;

import jakarta.persistence.*;
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
    private String name_section;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="grade_id")
    private Grade grade;

    @Enumerated(EnumType.STRING)
    private SectionStatus status;

    @ManyToMany(mappedBy = "sections")
    @JsonIgnore
    private List<Teachers> teachers;
}