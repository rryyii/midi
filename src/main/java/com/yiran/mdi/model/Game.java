package com.yiran.mdi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import java.util.Date;
import jakarta.persistence.Table;

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
     * @param publisher Publisher of the game
     * @param developer Main developer of the game
     * @param releaseDate Release date of the game
     */
    public Game(String name, String publisher, String developer, Date releaseDate) {
        this.name = name;
        this.publisher = publisher;
        this.developer = developer;
        this.releaseDate = releaseDate;
    }

    @Id
    private int id;

    @Column
    private String name;
    private String publisher;
    private String developer;
    private Date releaseDate;

}
