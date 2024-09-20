package com.fatec.siga.models.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "authorities")
// classe mapeamento de Autoridades no sistema
public class AuthorityEntity extends BaseEntity{
    private String authority;
    
    public AuthorityEntity() {
    }

    @Column(nullable = false,unique = true)
    public String getAuthority() {
        return authority;
    }

    public AuthorityEntity setAuthority(String authority) {
        this.authority = authority;
        return this;
    }
}
