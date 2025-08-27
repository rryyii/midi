package com.yiran.mdi.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    public Long id;
    public String username;
    public String password;
    public String email;
    public String bio;
}
