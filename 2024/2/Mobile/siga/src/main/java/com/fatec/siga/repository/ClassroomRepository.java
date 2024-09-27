package com.fatec.siga.repository;

import com.fatec.siga.constants.enumeration.ClassroomLetter;
import com.fatec.siga.constants.enumeration.ClassroomNumber;
import com.fatec.siga.model.entity.ClassroomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<ClassroomEntity,Long> {

    boolean existsByNumberAndLetter(ClassroomNumber number, ClassroomLetter letter);

    @Query(value = "SELECT g FROM ClassroomEntity g ORDER BY g.number , g.letter")
    List<ClassroomEntity> getAllOrderByNumberAndLetter();

}