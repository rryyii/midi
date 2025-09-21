package com.yiran.mdi.dto;

import lombok.Data;

@Data
public class UserAccountDto {
    private Long id;
    private String email;
    private String password;
    private String repeatPassword;
}
