package com.yiran.mdi.controller;

import com.yiran.mdi.dto.UserGameDto;
import com.yiran.mdi.dto.UserGameUpdateDto;
import com.yiran.mdi.model.UserGame;
import com.yiran.mdi.service.UserGameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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
    public List<UserGame> getUserGame(@PathVariable Long id, @RequestParam String status, @CookieValue(value="jwt") String jwt) {
        logger.debug("Fetching user's game list.");
        return service.getUserGames(id, status, jwt);
    }

    @PostMapping("/user/add_game")
    public ResponseEntity<String> addUserGame(@RequestBody UserGameDto data, @CookieValue(value="jwt") String jwt) {
        logger.debug("Beginning adding a game to a user's list.");
        if (service.addUserGame(data.getId(), data.getUser_id(), jwt)) {
            return ResponseEntity.status(200)
                    .body("Added game to user list");
        }
        return ResponseEntity.badRequest()
                .body("Failed to add game to user's list");
    }

    @DeleteMapping("/user/rm_game")
    public ResponseEntity<String> removeUserGame(@RequestBody UserGameDto data, @CookieValue(value="jwt") String jwt) {
        logger.debug("Beginning removing a game to a user's list.");
        if (service.removeUserGame(data.getId(), data.getUser_id(), jwt)) {
            return ResponseEntity.status(200)
                    .body("Removed game from user's list");
        }
        return ResponseEntity.badRequest()
                .body("Failed to remove game from user's list");
    }

    @PutMapping("/user/update_game")
    public ResponseEntity<String> updateUserGame(@RequestBody UserGameUpdateDto data, @CookieValue(value="jwt") String jwt) {
        logger.debug("Beginning updating a game in a user's list.");
        if (service.updateUserGame(data.getId(), data.getStatus(), data.getHoursPlayed(), data.isFavorite(), jwt)) {
            return ResponseEntity.status(200)
                    .body("Updated user's game information");
        }
        return ResponseEntity.badRequest()
                .body("Failed to update user's game information");
    }

}
