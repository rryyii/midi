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
@Table(name = "games")
public class Game {

    public Game() {}

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
