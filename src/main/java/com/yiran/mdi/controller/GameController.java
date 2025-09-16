package com.yiran.mdi.controller;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.service.GameService;
import com.yiran.mdi.service.IGDBService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
    private final GameService gameService;

    public GameController(IGDBService service, GameService gameService) {
        this.service = service;
        this.gameService = gameService;
    }

    @GetMapping("/games")
    public List<Game> getGames() {
        logger.debug("Beginning get request for all games.");
        return service.getGames();
    }

    @GetMapping("/game/{id}")
    public Game getGame(@PathVariable Long id) {
        logger.debug("Beginning get request for a game.");
        return gameService.getGame(id);
    }

    @GetMapping("/games/{page}")
    public Page<Game> getGamePage(@PathVariable int page) {
        logger.debug("Beginning get request for a page of games.");
        return gameService.getGamePage(page, 30);
    }

}
