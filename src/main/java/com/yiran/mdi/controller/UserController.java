package com.yiran.mdi.controller;

import com.yiran.mdi.dto.LoginRequestDto;
import com.yiran.mdi.dto.UserAccountDto;
import com.yiran.mdi.dto.UserUpdateDto;
import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.User;
import com.yiran.mdi.model.UserLogin;
import com.yiran.mdi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * REST controller for User POST, DELETE, and GET.
 *
 * @author rryyii
 */
@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/user")
    public boolean createUser(@RequestBody User user) {
        logger.debug("Beginning creating a new user.");
        service.createUser(user);
        return true;
    }

    @DeleteMapping("/rm_user/{id}")
    public boolean removeUser(@RequestBody Long id) {
        logger.debug("Beginning removing a user from database.");
        service.deleteUser(id);
        return true;
    }

    @PutMapping("/update_user")
    public ResponseEntity<User> updateUser(@RequestBody UserUpdateDto user, @RequestHeader("Authorization") String authHeader) {
        logger.debug("Beginning updating a user in database.");
        service.updateUser(user.getId(), user.getUsername(), user.getBio(), authHeader);
        User newInfo = service.getUser(user.getId());
        return new ResponseEntity<>(newInfo, null, HttpStatus.ACCEPTED);
    }

    @PostMapping("/login_user")
    public ResponseEntity<UserLogin> validateUser(@RequestBody LoginRequestDto login) {
        logger.debug("Beginning authentication process for user.");
        HttpHeaders headers = new HttpHeaders();
        long result = service.authenticateUser(login.getUsername());
        if (result == -1) {
            logger.error("Failed to authenticate user.");
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
        User info = service.getUser(result);
        UserLogin secureLogin = new UserLogin();
        secureLogin.setId(info.getId());
        secureLogin.setUsername(info.getUsername());
        secureLogin.setBio(info.getBio());
        logger.debug(info.toString());
        List<String> access = new ArrayList<>();
        access.add("Authorization");
        headers.setAccessControlExposeHeaders(access);
        headers.setBearerAuth(UserService.buildToken(login.getUsername()));
        logger.info("Successfully logged in user.");
        return new ResponseEntity<>(secureLogin, headers, HttpStatus.CREATED);
    }

    @GetMapping("/user_favorites/{id}")
    public List<Game> getUserFavorites(@PathVariable long id, @RequestHeader("Authorization") String authHeader) {
        logger.debug("Fetching user's favorite games");
        return service.getFavorites(id, authHeader);
    }

    @PostMapping("/user_account")
    public boolean changeAccountInfo(@RequestBody UserAccountDto data, @RequestHeader("Authorization") String authHeader) {
        logger.debug("Changing user's account information");
        return service.changeAccountInfo(data, authHeader);
    }

}
