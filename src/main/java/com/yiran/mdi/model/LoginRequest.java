package com.yiran.mdi.model;

import lombok.Data;

/**
 * Basic DTO for a user login request.
 *
 * @author rryyii
 */
@Data
public class LoginRequest {
    public String username;
    public String password;
}
