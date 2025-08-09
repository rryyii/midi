package com.yiran.mdi.repository;

import com.yiran.mdi.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for games table.
 *
 * @author rryyii
 */
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
}
