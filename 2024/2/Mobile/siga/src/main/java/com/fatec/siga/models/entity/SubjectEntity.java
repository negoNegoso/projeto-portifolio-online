package com.fatec.siga.models.entity;

import com.fatec.siga.constants.enumeration.SubjectEnumeration;

import jakarta.persistence.*;

@Entity
@Table(name = "subjects")
//classe mapeamento de Materias, Salas e Professores
public class SubjectEntity extends BaseEntity{
    private SubjectEnumeration subject;
    private ClassroomEntity classroom;
    private TeacherEntity teacher;

    public SubjectEntity() {
    }

    public SubjectEnumeration getSubject() {
        return subject;
    }

    public SubjectEntity setSubject(SubjectEnumeration subject) {
        this.subject = subject;
        return this;
    }

    @ManyToOne
    public ClassroomEntity getClassroom() {
        return classroom;
    }

    public SubjectEntity setClassroom(ClassroomEntity classroom) {
        this.classroom = classroom;
        return this;
    }

    @ManyToOne()
    public TeacherEntity getTeacher() {
        return teacher;
    }

    public SubjectEntity setTeacher(TeacherEntity teacher) {
        this.teacher = teacher;
        return this;
    }
}
