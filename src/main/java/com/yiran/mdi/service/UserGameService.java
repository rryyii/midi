package com.yiran.mdi.service;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.User;
import com.yiran.mdi.model.UserGame;
import com.yiran.mdi.repository.UserGameRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserGameService {

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
        repository.save(newUserGame);
        return true;
    }

    public boolean removeUserGame(long id) {
        repository.deleteById(id);
        return true;
    }


}
