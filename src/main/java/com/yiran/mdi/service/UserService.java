package com.yiran.mdi.service;

import com.yiran.mdi.model.User;
import org.springframework.stereotype.Service;
import java.util.Date;

/**
 * Provides services for User actions.
 * @author rryyii
 */
@Service
public class UserService {

    public User createUser(String username, char[] password, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setCreationDate(new Date());
        return user;
    }


}
