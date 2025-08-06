package com.yiran.mdi.controller;

import com.yiran.mdi.model.UserGame;
import com.yiran.mdi.model.UserGameDto;
import com.yiran.mdi.service.UserGameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserGameController {

    private final UserGameService service;
    private static final Logger logger = LoggerFactory.getLogger(UserGameController.class);

    public UserGameController(UserGameService service) {
        this.service = service;
    }

    @GetMapping("/user/games/{id}")
    public List<UserGame> getUserGame(@PathVariable String id) {
        logger.debug("Fetching user's game list.");
        return service.getUserGames(Long.parseLong(id));
    }

    @PostMapping("/user/add_game")
    public boolean addUserGame(@RequestBody UserGameDto data) {
        logger.debug("Beginning adding a game to a user's list.");
        return service.addUserGame(data.id, data.userId);
    }

    @DeleteMapping("/user/rm_game")
    public boolean removeUserGame(@RequestBody Long userId, String gameName) {
        logger.debug("Beginning removing a game to a user's list.");
        return service.removeUserGame(userId, gameName);
    }

}
