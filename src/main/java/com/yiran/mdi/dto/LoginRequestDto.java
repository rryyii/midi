package com.yiran.mdi.dto;

import lombok.Data;

/**
 * Basic DTO for a user login request.
 *
 * @author rryyii
 */
@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
