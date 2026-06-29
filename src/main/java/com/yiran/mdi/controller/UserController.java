package com.yiran.mdi.controller;

import com.yiran.mdi.dto.LoginRequestDto;
import com.yiran.mdi.dto.UserAccountCreateDto;
import com.yiran.mdi.dto.UserAccountDto;
import com.yiran.mdi.dto.UserUpdateDto;
import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.User;
import com.yiran.mdi.model.UserLogin;
import com.yiran.mdi.service.UserService;
import jakarta.validation.constraints.Positive;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for User POST, DELETE, and GET.
 *
 * @author rryyii
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/")
    public ResponseEntity<String> createUser(@RequestBody UserAccountCreateDto user) {
        logger.debug("Beginning creating a new user.");
        service.createUser(user);
        return ResponseEntity.status(200)
                .body("User created successfully");
    }

    @DeleteMapping("/{id}")
    public boolean removeUser(@Positive @RequestBody Long id) {
        logger.debug("Beginning removing a user from database.");
        service.deleteUser(id);
        return true;
    }

    @PutMapping("/")
    public ResponseEntity<User> updateUser(@RequestBody UserUpdateDto user, @CookieValue(value="jwt") String jwt) {
        logger.debug("Beginning updating a user in database.");
        service.updateUser(user.getId(), user.getUsername(), user.getBio(), jwt);
        User newInfo = service.getUser(user.getId());
        return new ResponseEntity<>(newInfo, null, HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLogin> validateUser(@RequestBody LoginRequestDto login) {
        logger.debug("Beginning authentication process for user.");
        long result = service.authenticateUser(login.getUsername(), login.getPassword());
        logger.warn(String.valueOf(result));
        if (result == -1) {
            logger.error("Failed to authenticate user.");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        User info = service.getUser(result);
        UserLogin secureLogin = new UserLogin();
        secureLogin.setId(info.getId());
        secureLogin.setUsername(info.getUsername());
        secureLogin.setBio(info.getBio());
        String jwt = service.buildToken(login.getUsername());
        ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(60 * 60)
                .build();
        logger.info("Successfully logged in user.");
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(secureLogin);
    }

    @GetMapping("/favorites/{id}")
    public List<Game> getUserFavorites(@PathVariable long id, @CookieValue(value="jwt") String jwt) {
        logger.debug("Fetching user's favorite games");
        return service.getFavorites(id, jwt);
    }

    @PostMapping("/account")
    public ResponseEntity<String> changeAccountInfo(@RequestBody UserAccountDto data, @CookieValue(value="jwt") String jwt) {
        logger.debug("Changing user's account information");
        boolean result = service.changeAccountInfo(data, jwt);
        if (result) {
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body("Successfully updated user info.");
        }
        return ResponseEntity.badRequest()
                .body("Failed to update user info");
    }

}
