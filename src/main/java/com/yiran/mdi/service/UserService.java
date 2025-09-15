package com.yiran.mdi.service;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.User;
import com.yiran.mdi.repository.GameRepository;
import com.yiran.mdi.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.List;
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
    private final GameRepository gameRepository;

    public UserService(UserRepository repository, GameRepository gameRepository) {
        this.repository = repository;
        this.gameRepository = gameRepository;
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
        repository.save(user);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public void updateUser(long id, String username, String password, String email, String bio) {
        User user = getUser(id);
        if (username != null&& !username.isEmpty()) {
            logger.debug("Updating user's username.");
            user.setUsername(username);
        }
        if (password != null && !password.isEmpty()) {
            logger.debug("Updating user's password.");
            user.setPassword(password);
        }
        if (email != null && !email.isEmpty()) {
            logger.debug("Updating user's email.");
            user.setEmail(email);
        }
        if (bio != null && !bio.isEmpty()) {
            logger.debug("Updating user's bio.");
            user.setBio(bio);
        }
        repository.save(user);
    }

    public Long authenticateUser(String username) {
        logger.debug("Entered authentication function for user.");
        List<User> list = repository.findAll();
        for (User user : list) {
            if (user.getUsername().equalsIgnoreCase(username)) {
                logger.info("Successfully authenticated user.");
                return user.getId();
            }
        }
        return (long) -1;
    }

    public List<Game> getFavorites(long id) {
        return null;
    }

}
