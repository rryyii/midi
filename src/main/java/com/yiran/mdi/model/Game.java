package com.yiran.mdi.model;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Game table model class for name "games"
 *
 * @author rryyii
 */
@Data
@Entity
@Table(name = "games")
public class Game {

    public Game() {
    }

    @Override
    public String toString() {
        return String.format("Name: %s, Summary: %s", name, summary);
    }

    @Id
    private Long id;

    @Column
    private String name;
    private int[] genres;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column
    private String cover;

    @Version
    private Long version;

}
