package com.yiran.mdi.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Basic DTO for a user login request.
 *
 * @author rryyii
 */
@Getter
@Setter
public class LoginRequestDto {
    private String username;
    private String password;
}
