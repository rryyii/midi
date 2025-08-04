package com.yiran.mdi.controller;

import com.yiran.mdi.model.LoginRequest;
import com.yiran.mdi.model.User;
import com.yiran.mdi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * REST controller for User POST, DELETE, UPDATE, and GET.
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

    @PostMapping("/login_user")
    public ResponseEntity<String> validateUser(@RequestBody LoginRequest login) {
        logger.debug("Beginning authentication process for user.");
        HttpHeaders headers = new HttpHeaders();
        if (!service.authenticateUser(login.username)) {
            logger.error("Failed to authenticate user.");
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
        List<String> access = new ArrayList<>();
        access.add("Authorization");
        headers.setAccessControlExposeHeaders(access);
        headers.setBearerAuth(UserService.buildToken(login.username));
        logger.info("Successfully logged in user.");
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

}
