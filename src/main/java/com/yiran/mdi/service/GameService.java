package com.yiran.mdi.service;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);
    private final GameRepository repository;

    public GameService(GameRepository repository) {
        this.repository = repository;
    }


    public Game getGame(long id) {
        Optional<Game> result = repository.findById(id);
        return result.orElse(null);
    }


}
