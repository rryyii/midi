package com.yiran.mdi.repository;

import com.yiran.mdi.model.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for user games table.
 *
 * @author rryyii
 */
@Repository
public interface UserGameRepository extends JpaRepository<UserGame, Long> {

    List<UserGame> findByUserId(long user_id);

    List<UserGame> findByStatus(String status);

}
