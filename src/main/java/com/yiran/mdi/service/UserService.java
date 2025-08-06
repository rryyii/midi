package com.yiran.mdi.service;

import com.yiran.mdi.model.User;
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
 * @author rryyii
 */
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private static final SecretKey key = Jwts.SIG.HS256.key().build();
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
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

    public Long authenticateUser(String username) {
        logger.debug("Entered authentication function for user.");
        List<User> list = repository.findAll();
        logger.info(list.toString());
        for (User user : list) {
            if (user.getUsername().equalsIgnoreCase(username)) {
                logger.info("Successfully authenticated user.");
                return user.getId();
            }
        }
        return (long) -1;
    }

    public static String buildToken(String username) {
        return Jwts.builder()
                .subject(username)
                .signWith(key)
                .compact();
    }

}
