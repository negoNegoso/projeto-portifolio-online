package com.fatec.siga.repository;

import com.fatec.siga.constants.enumeration.SubjectEnum;
import com.fatec.siga.model.entity.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {

    boolean existsBySubjectAndClassroomId(SubjectEnum subject, Long group_id);

    List<SubjectEntity> findAllByClassroomId(Long groupId);

}
