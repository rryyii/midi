package com.yiran.mdi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

/**
 * MySQL table containing UserGames with name "user_games".
 *
 * @author rryyii
 */
@Data
@Entity
@Table(name = "user_games")
public class UserGame {

    public UserGame() {
    }

    public String toString() {
        return String.format("Game: %s, Status: %s, Hours Played: %d, Date Added: %s", game.getName(),
                status, hoursPlayed, dateAdded.toString());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Game game;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String status;
    private int hoursPlayed;
    private Date dateAdded;
    private boolean isFavorite;


}
