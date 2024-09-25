package com.fatec.siga.models.entity;

import java.util.List;

import com.fatec.siga.constants.enumeration.ClassroomEnumeration;

import jakarta.persistence.*;

@Entity
@Table(name = "classrooms")
// classe mapeamento de salas -> DSM
public class ClassroomEntity extends BaseEntity{

    private ClassroomEnumeration classroom;
    private List<SubjectEntity> subjects;
    // private List<Students> students

    @Enumerated(EnumType.ORDINAL)
    public ClassroomEnumeration getClassroomEnumeration() {
        return classroom;
    }

    public ClassroomEntity setClassroomEnumeration(ClassroomEnumeration classroom) {
        this.classroom = classroom;
        return this;
    }

    @OneToMany(mappedBy = "classroom")
    public List<SubjectEntity> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectEntity> subjects) {
        this.subjects = subjects;
    }
}
