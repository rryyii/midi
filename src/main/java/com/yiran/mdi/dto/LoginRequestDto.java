package com.yiran.mdi.dto;

import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private String username;
    @NotNull
    private String password;
}
