package com.yiran.mdi.controller;

import com.yiran.mdi.model.UserGame;
import com.yiran.mdi.dto.UserGameDto;
import com.yiran.mdi.dto.UserGameUpdateDto;
import com.yiran.mdi.service.UserGameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for UserGame POST, DELETE, and GET.
 *
 * @author rryyii
 */
@RestController
public class UserGameController {

    private static final Logger logger = LoggerFactory.getLogger(UserGameController.class);
    private final UserGameService service;

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
        return service.addUserGame(data.id, data.getUser_id());
    }

    @DeleteMapping("/user/rm_game")
    public boolean removeUserGame(@RequestBody UserGameDto data) {
        logger.debug("Beginning removing a game to a user's list.");
        return service.removeUserGame(data.getId());
    }

    @PutMapping("/user/update_game")
    public boolean updateUserGame(@RequestBody UserGameUpdateDto data) {
        logger.debug("Beginning updating a game in a user's list.");
        return service.updateUserGame(data.id, data.status, data.hoursPlayed, data.isFavorite);
    }

}
