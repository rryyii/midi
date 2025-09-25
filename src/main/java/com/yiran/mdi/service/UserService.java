package com.yiran.mdi.service;

import com.yiran.mdi.dto.UserAccountDto;
import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.User;
import com.yiran.mdi.model.UserGame;
import com.yiran.mdi.repository.UserGameRepository;
import com.yiran.mdi.repository.UserRepository;
import com.yiran.mdi.util.PasswordEncryptor;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Provides services for User actions.
 *
 * @author rryyii
 */
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private static final SecretKey key = Jwts.SIG.HS256.key().build();
    private final UserRepository repository;
    private final UserGameRepository gameRepository;

    public UserService(UserRepository repository, UserGameRepository gameRepository) {
        this.repository = repository;
        this.gameRepository = gameRepository;
    }

    public static boolean checkToken(String token, String username) {
        return Objects.equals(buildToken(username), token);
    }

    public static String buildToken(String username) {
        return Jwts.builder()
                .subject(username)
                .signWith(key)
                .compact();
    }

    public User getUser(long id) {
        Optional<User> result = repository.findById(id);
        return result.orElse(null);
    }

    public void createUser(User user) {
        User newUser = new User();
        newUser.setId(user.getId());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(PasswordEncryptor.encryptPassword(user.getPassword()));
        newUser.setUsername(user.getUsername());
        newUser.setBio(user.getBio());
        newUser.setCreationDate(user.getCreationDate());
        repository.save(newUser);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public void updateUser(long id, String username, String bio, String jwt) {
        User user = getUser(id);
        if (!checkToken(jwt, user.getUsername())) {
            logger.error("Failed to authentication token for updating user.");
            return;
        }
        if (username != null && !username.isEmpty()) {
            logger.debug("Updating user's username.");
            user.setUsername(username);
        }
        if (bio != null && !bio.isEmpty()) {
            logger.debug("Updating user's bio.");
            user.setBio(bio);
        }
        repository.save(user);
    }

    public Long authenticateUser(String username, String password) {
        logger.debug("Entered authentication function for user.");
        List<User> list = repository.findAll();
        for (User user : list) {
            if (user.getUsername().equalsIgnoreCase(username) && PasswordEncryptor.checkPassword(password, user.getPassword())) {
                logger.info("Successfully authenticated user.");
                return user.getId();
            }
        }
        return (long) -1;
    }

    public List<Game> getFavorites(long id, String jwt) {
        Optional<User> user = repository.findById(id);
        if (user.isPresent() && checkToken(jwt, user.get().getUsername())) {
            List<UserGame> list = gameRepository.findAll();
            List<Game> result = new ArrayList<>();
            for (UserGame game : list) {
                if (game.isFavorite() && Objects.equals(user.get().getId(), game.getUser().getId())) {
                    result.add(game.getGame());
                }
            }
            return result;
        }
        logger.error("Failed to authenticate for favorites");
        return null;

    }

    public boolean changeAccountInfo(UserAccountDto data, String jwt) {
        Optional<User> findUser = repository.findById(data.getId());
        if (findUser.isEmpty() || !checkToken(jwt, findUser.get().getUsername())) {
            return false;
        }
        User user = findUser.get();
        String password = data.getPassword();
        String repeat = data.getRepeatPassword();
        String email = data.getEmail();
        if (!password.isEmpty() && !repeat.isEmpty()) {
            if (!password.equals(repeat)) {
                return false;
            }
            user.setPassword(PasswordEncryptor.encryptPassword(password));
        }
        if (!email.isEmpty()) {
            user.setEmail(email);
        }
        return true;
    }

}
