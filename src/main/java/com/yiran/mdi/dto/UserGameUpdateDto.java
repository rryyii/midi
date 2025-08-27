package com.yiran.mdi.dto;

import lombok.Data;

@Data
public class UserGameUpdateDto {
    public Long id;
    public String status;
    public int hoursPlayed;
    public boolean isFavorite;
}
