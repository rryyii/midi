package com.yiran.mdi.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String bio;
}
