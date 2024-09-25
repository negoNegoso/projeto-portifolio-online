package com.fatec.siga.models;

public abstract class BaseModel {
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
