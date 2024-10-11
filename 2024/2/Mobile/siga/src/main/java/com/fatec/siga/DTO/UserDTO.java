package com.fatec.siga.DTO;

import com.fatec.siga.constants.enumeration.AuthorityEnumeration;
import com.fatec.siga.models.entity.AuthorityEntity;

import java.util.List;

public class UserDTO {

    private String user;
    private String email;
    private String password;
    private AuthorityEnumeration role;

    public String getEmail() {
        return "";
    }

    public CharSequence getPassword() {
        return null;
    }

    public List<AuthorityEntity> getRole() {
        return List.of();
    }
}
