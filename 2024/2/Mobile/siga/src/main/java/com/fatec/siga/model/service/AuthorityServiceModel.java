package com.fatec.siga.model.service;

import com.fatec.siga.model.BaseModel;

public class AuthorityServiceModel extends BaseModel{

    private String authority;

    public AuthorityServiceModel() {
    }

    // @Override
    // public String getAuthority() {
    //     return authority;
    // }

    public AuthorityServiceModel setAuthority(String authority) {
        this.authority = authority;
        return this;
    }

    @Override
    public String toString() {
        return authority;
    }
}
