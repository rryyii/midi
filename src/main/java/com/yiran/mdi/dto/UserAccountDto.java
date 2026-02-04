package com.yiran.mdi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAccountDto {
    private Long id;
    private String email;
    private String password;
    private String repeatPassword;
}
