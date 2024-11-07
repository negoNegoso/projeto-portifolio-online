package com.fatec.siga.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="teachers")
public class Teachers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String email;
    private String password;
    private String name;
    
    @Temporal(TemporalType.DATE)
    private Date joiningData;

    @ManyToMany
    @JoinTable(
            name="teacher_section",
            joinColumns = @JoinColumn(name="teacher_id"),
            inverseJoinColumns = @JoinColumn(name="section_id")
    )
    private List<Section> sections;
}