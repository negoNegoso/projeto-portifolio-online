package com.fatec.siga.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fatec.siga.model.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long>{
    
    Optional<UserEntity> findByEmail(String email);
        
    @Query(value = "SELECT  * FROM users u " +
            "JOIN users_authorities ua on u.id = ua.user_id " +
            "JOIN authorities a on ua.authority_id = a.id " +
            "WHERE a.authority = ?1 " +
            "ORDER BY u.email",
    nativeQuery  = true)
    List<UserEntity> findAllByAuthority(String authority);

    boolean existsByEmail(String email);
}
