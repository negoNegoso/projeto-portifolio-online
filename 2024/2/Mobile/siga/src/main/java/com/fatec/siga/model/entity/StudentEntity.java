package com.fatec.siga.model.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "students")
public class StudentEntity extends BaseEntity {

    private String firstName;
    private String middleName;
    private String lastName;
    private ClassroomEntity classroom;
    private UserEntity user;
    private List<MarkEntity> marks;

    public StudentEntity() {
    }

    public String getFirstName() {
        return firstName;
    }

    public StudentEntity setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getMiddleName() {
        return middleName;
    }

    public StudentEntity setMiddleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public StudentEntity setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    @ManyToOne
    public ClassroomEntity getClassroom() {
        return classroom;
    }

    public StudentEntity setClassroom(ClassroomEntity classroom) {
        this.classroom = classroom;
        return this;
    }

    @ManyToOne
    public UserEntity getUser() {
        return user;
    }

    public StudentEntity setUser(UserEntity user) {
        this.user = user;
        return this;
    }

    @OneToMany(mappedBy = "student")
    public List<MarkEntity> getMarks() {
        return marks;
    }

    public void setMarks(List<MarkEntity> marks) {
        this.marks = marks;
    }
}