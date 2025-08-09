package com.yiran.mdi.controller;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.service.IGDBService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Game table including POST, DELETE, and GET.
 *
 * @author rryyii
 */
@RestController
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private final IGDBService service;

    public GameController(IGDBService service) {
        this.service = service;
    }

    @GetMapping("/games")
    public List<Game> getGames() {
        logger.debug("Beginning get request for all games.");
        return service.getGames();
    }

    @PostMapping("/add_game")
    public boolean addGame(@RequestBody Game game) {
        logger.debug("Beginning add game request.");
        return true;
    }

    @DeleteMapping("/rm_game/{id}")
    public boolean removeGame(@RequestBody Long id) {
        logger.debug
                ("Beginning removing a game from database.");
        return true;
    }


}
