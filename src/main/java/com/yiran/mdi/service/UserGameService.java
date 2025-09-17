package com.yiran.mdi.service;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.User;
import com.yiran.mdi.model.UserGame;
import com.yiran.mdi.repository.UserGameRepository;
import com.yiran.mdi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserGameService {

    private final Logger logger = LoggerFactory.getLogger(UserGameService.class);
    private final UserGameRepository repository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final GameService gameService;

    public UserGameService(UserGameRepository repository, UserRepository userRepository, UserService userService, GameService gameService) {
        this.repository = repository;
        this.userService = userService;
        this.gameService = gameService;
        this.userRepository = userRepository;
    }

    private boolean handleUserAuth(long id, String authHeader) {
        Optional<User> user = userRepository.findById(id);
        return user.isPresent() && UserService.checkToken(authHeader, user.get().getUsername());
    }

    public List<UserGame> getUserGames(long id, String authHeader) {
        if (handleUserAuth(id, authHeader)) {
            logger.debug("Authorized user");
            return repository.findByUserId(id);
        }
        logger.debug("Failed to authorize for getting user's games.");
        return null;
    }

    public boolean addUserGame(long id, long userId, String authHeader) {
        if (!handleUserAuth(userId, authHeader)) {
            logger.error("Failed to authorize for adding a game to a user.");
            return false;
        }
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

    public boolean removeUserGame(long id, long userId, String authHeader) {
        if (!handleUserAuth(userId, authHeader)) {
            logger.error("Failed to authenticate for removing a user's game.");
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    public boolean updateUserGame(long id, String status, int hoursPlayed, boolean isFavorite, String authHeader) {
        UserGame userGame = repository.findById(id).orElse(null);
        assert userGame != null;
        if (!handleUserAuth(userGame.getUser().getId(), authHeader)) {
            logger.error("Failed to authenticate user token for updating user game");
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
