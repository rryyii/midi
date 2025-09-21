package com.yiran.mdi.dto;

import lombok.Data;

@Data
public class UserGameUpdateDto {
    private Long id;
    private String status;
    private int hoursPlayed;
    private boolean favorite;
    private boolean unFavorite;
}
