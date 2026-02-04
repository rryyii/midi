package com.yiran.mdi.controller;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.service.GameService;
import com.yiran.mdi.util.IGDBService;
import jakarta.validation.constraints.Positive;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Game table including POST, DELETE, and GET.
 *
 * @author rryyii
 */
@RestController
@RequestMapping("/game")
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private final IGDBService service;
    private final GameService gameService;

    public GameController(IGDBService service, GameService gameService) {
        this.service = service;
        this.gameService = gameService;
    }

    @GetMapping("/")
    public List<Game> getGames() {
        logger.debug("Beginning get request for all games.");
        return service.getGames();
    }

    @GetMapping("/game/{id}")
    public Game getGame(@Positive @PathVariable Long id) {
        logger.debug("Beginning get request for a game.");
        return gameService.getGame(id);
    }

    @GetMapping("/name/{name}")
    public List<Game> getGameName(@PathVariable String name) {
        return gameService.getGames(name);
    }

    @GetMapping("/{page}")
    public Page<Game> getGamePage(@PathVariable int page, @RequestParam String filter) {
        logger.debug("Beginning get request for a page of games.");
        return gameService.getGamePage(page, filter, 30);
    }

}
