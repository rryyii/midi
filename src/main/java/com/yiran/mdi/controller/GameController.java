package com.yiran.mdi.controller;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Game table including POST, DELETE, and GET.
 * @author rryyii
 */
@RestController
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private final GameRepository repository;

    public GameController(GameRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/games")
    public List<Game> getGames() {
        logger.debug("Beginning get request for all games.");
        return repository.findAll();
    }

    @PostMapping("/add_game")
    public boolean addGame(@RequestBody Game game) {
        logger.debug("Beginning add game request.");
        repository.save(game);
        return true;
    }

    @DeleteMapping("/rm_game/{id}")
    public boolean removeGame(@RequestBody Long id) {
        logger.debug
                ("Beginning removing a game from database.");
        repository.deleteById(id);
        return true;
    }
}
