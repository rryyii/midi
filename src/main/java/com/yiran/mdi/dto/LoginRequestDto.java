package com.yiran.mdi.dto;

import lombok.Data;

/**
 * Basic DTO for a user login request.
 *
 * @author rryyii
 */
@Data
public class LoginRequestDto {
    public String username;
    public String password;
}
