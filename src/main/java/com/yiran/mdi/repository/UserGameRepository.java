package com.yiran.mdi.repository;

import com.yiran.mdi.model.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGameRepository extends JpaRepository<UserGame, Long> {

    List<UserGame> findByUserId(long user_id);

}
