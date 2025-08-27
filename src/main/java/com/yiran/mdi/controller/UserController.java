package com.yiran.mdi.controller;

import com.yiran.mdi.dto.LoginRequestDto;
import com.yiran.mdi.model.User;
import com.yiran.mdi.dto.UserUpdateDto;
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
    public ResponseEntity<User> updateUser(@RequestBody UserUpdateDto user) {
        logger.debug("Beginning updating a user in database.");
        logger.debug(user.toString());
        service.updateUser(user.id, user.username, user.password, user.email, user.bio);
        User newInfo = service.getUser(user.id);
        return new ResponseEntity<>(newInfo, null, HttpStatus.ACCEPTED);
    }

    @PostMapping("/login_user")
    public ResponseEntity<User> validateUser(@RequestBody LoginRequestDto login) {
        logger.debug("Beginning authentication process for user.");
        HttpHeaders headers = new HttpHeaders();
        long result = service.authenticateUser(login.username);
        if (result == -1) {
            logger.error("Failed to authenticate user.");
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
        User info = service.getUser(result);
        info.setPassword("");
        logger.debug(info.toString());
        List<String> access = new ArrayList<>();
        access.add("Authorization");
        headers.setAccessControlExposeHeaders(access);
        headers.setBearerAuth(UserService.buildToken(login.username));
        logger.info("Successfully logged in user.");
        return new ResponseEntity<>(info, headers, HttpStatus.CREATED);
    }

}
