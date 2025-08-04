package com.yiran.mdi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

/**
 * Game table model class.
 * @author rryyii
 */
@Data
@Entity
@Table(name="games")
public class Game {

    public Game(){}

    /**
     * Game Constructor.
     * @param name Title of the game
     * @param genre Genre of the game
     * @param publisher Publisher of the game
     * @param developer Main developer of the game
     */
    public Game(String name, String publisher, String genre, String developer, Date releaseDate) {
        this.name = name;
        this.genre = genre;
        this.publisher = publisher;
        this.developer = developer;
        this.releaseDate = releaseDate;
    }

    @Override
    public String toString() {
        return String.format("Name: %s, Genre: %s, Publisher: %s, Developer: %s, Release Date: %s", name, genre, publisher, developer, releaseDate.toString());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    private String genre;
    private String publisher;
    private String developer;
    private Date releaseDate;

}
