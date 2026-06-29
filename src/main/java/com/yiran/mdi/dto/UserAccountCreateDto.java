package com.yiran.mdi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAccountCreateDto {

    private String username;
    @Email
    private String email;
    private Long id;
    @Size(min=8)
    private String password;
    @Size(min=8)
    private String repeatPassword;
}
