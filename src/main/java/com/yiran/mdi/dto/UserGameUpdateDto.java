package com.yiran.mdi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserGameUpdateDto {
    private Long id;
    private String status;
    private String notes;
    private int rating;
    private int hoursPlayed;
    private boolean favorite;
    private boolean unFavorite;
}
