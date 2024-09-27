package com.fatec.siga.model.service;

import com.fatec.siga.model.BaseModel;

public class MarkServiceModel extends BaseModel {

    private int value;
    private SubjectServiceModel subject;
    private StudentServiceModel student;

    public MarkServiceModel() {
    }

    public int getValue() {
        return value;
    }

    public MarkServiceModel setValue(int value) {
        this.value = value;
        return this;
    }

    public SubjectServiceModel getSubject() {
        return subject;
    }

    public MarkServiceModel setSubject(SubjectServiceModel subject) {
        this.subject = subject;
        return this;
    }

    public StudentServiceModel getStudent() {
        return student;
    }

    public MarkServiceModel setStudent(StudentServiceModel student) {
        this.student = student;
        return this;
    }
}
