package com.fatec.siga.models.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
// classe mapeamento de Usuarios no sistema
public class UserEntity extends BaseEntity{
    private String email;
    private String password;
    private List<AuthorityEntity> authorities;

    public UserEntity() {
        this.authorities = new ArrayList<>();
    }

    @Column(nullable = false,unique = true,name = "email")
    public String getEmail() {
        return email;
    }

    public UserEntity setEmail(String email) {
        this.email = email;
        return this;
    }

    @Column(nullable = false)
    public String getPassword() {
        return password;
    }

    public UserEntity setPassword(String password) {
        this.password = password;
        return this;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    public List<AuthorityEntity> getAuthorities() {
        return authorities;
    }

    public UserEntity setAuthorities(List<AuthorityEntity> authorities) {
        this.authorities = authorities;
        return this;
    }
    
}
