package com.yiran.mdi.repository;

import com.yiran.mdi.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for games table.
 *
 * @author rryyii
 */
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByNameContainingIgnoreCase(String name);


}
