package com.fatec.siga.utils;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class AuthRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
