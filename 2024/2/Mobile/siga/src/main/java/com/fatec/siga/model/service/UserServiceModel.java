package com.fatec.siga.model.service;


public class UserServiceModel extends BaseModel{

    private String email;
    
    public UserServiceModel() {
    }

    public String getEmail() {
        return email;
    }

    public UserServiceModel setEmail(String email) {
        this.email = email;
        return this;
    }
}
