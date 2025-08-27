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

    private final Logger logger = LoggerFactory.getLogger(UserGameService.class);
    private final UserGameRepository repository;
    private final UserService userService;
    private final GameService gameService;

    public UserGameService(UserGameRepository repository, UserService userService, GameService gameService) {
        this.repository = repository;
        this.userService = userService;
        this.gameService = gameService;
    }

    public List<UserGame> getUserGames(long id) {
        return repository.findByUserId(id);
    }

    public boolean addUserGame(long id, long userId) {
        Game newGame = gameService.getGame(id);
        User newUser = userService.getUser(userId);
        UserGame newUserGame = new UserGame();
        newUserGame.setGame(newGame);
        newUserGame.setUser(newUser);
        newUserGame.setDateAdded(new Date());
        newUserGame.setStatus("Unplayed");
        logger.debug(newUser.toString());
        logger.debug(newGame.toString());
        repository.save(newUserGame);
        return true;
    }

    public boolean removeUserGame(long id) {
        repository.deleteById(id);
        return true;
    }

    public boolean updateUserGame(long id, String status, int hoursPlayed, boolean isFavorite) {
        UserGame userGame = repository.findById(id).orElse(null);
        if (userGame == null) {
            return false;
        }
        if (status != null && !status.isEmpty()) {
            userGame.setStatus(status);
        }
        if (hoursPlayed >= 0) {
            userGame.setHoursPlayed(hoursPlayed);
        }
        userGame.setFavorite(isFavorite);
        repository.save(userGame);
        return true;
    }


}
