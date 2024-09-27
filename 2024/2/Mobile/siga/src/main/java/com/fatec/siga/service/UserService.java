package com.fatec.siga.service;

import com.fatec.siga.model.service.UserAuthenticationServiceModel;
import com.fatec.siga.model.service.UserServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
        List<UserServiceModel> getAllUsers();

    void deleteUser(Long id);

    UserServiceModel getUser(Long id);

    UserAuthenticationServiceModel getUserWithAuthorities(Long userId);

    void addAuthority(Long userId,String authority);

    void removeAuthority(Long userId,String authority);

    List<UserServiceModel> getAllAdmins();

    List<UserServiceModel> getAllTeachers();

    List<UserServiceModel> getAllStudents();

    long getUserCount();

    boolean resendPassword(String email);
}
