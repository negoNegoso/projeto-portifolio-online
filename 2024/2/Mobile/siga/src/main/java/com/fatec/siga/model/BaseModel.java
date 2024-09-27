package com.fatec.siga.model;

public class BaseModel {
    private Long id;

    protected BaseModel() {
    }

    public Long getId() {
        return id;
    }

    public BaseModel setId(Long id) {
        this.id = id;
        return this;
    }
}
