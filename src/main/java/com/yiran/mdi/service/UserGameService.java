package com.yiran.mdi.service;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.User;
import com.yiran.mdi.model.UserGame;
import com.yiran.mdi.repository.UserGameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserGameService {

    private static final Logger logger = LoggerFactory.getLogger(UserGameService.class);
    private final UserGameRepository repository;
    private final UserService userService;
    private final GameService gameService;

    public UserGameService(UserGameRepository repository, UserService userService, GameService gameService) {
        this.repository = repository;
        this.userService = userService;
        this.gameService = gameService;
    }

    public List<UserGame> getUserGames(long id) {
        logger.debug("Fetching all user's games.");
        return  repository.findByUserId(id);
    }

    public boolean addUserGame(long id, long userId) {
        logger.debug("Adding game to user's list.");
        Game newGame = gameService.getGame(id);
        User newUser = userService.getUser(userId);
        UserGame newUserGame = new UserGame();
        newUserGame.setGame(newGame);
        newUserGame.setUser(newUser);
        newUserGame.setDateAdded(new Date());
        repository.save(newUserGame);
        return false;
    }

    public boolean removeUserGame(long id, String game) {
        logger.debug("Removing game from user's list.");
        return false;
    }


}
