package com.yiran.mdi.service;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public Page<Game> getGamePage(int page, int size) {
        logger.debug("Getting page {} of {} games.", page, size);
        if (page < 0 || size < 0) {
            logger.warn("Invalid page or size.");
            return null;
        }
        Page<Game> result = repository.findAll(PageRequest.of(page, size));
        if (result.hasContent()) {
            return result;
        }
        logger.warn("No games found on page {}.", page);
        return null;
    }


}
