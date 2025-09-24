package com.yiran.mdi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.util.List;

/**
 * Game table model class for name "games"
 *
 * @author rryyii
 */
@Data
@Entity
@Table(name = "games")
public class Game implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    private Long id;
    @Column
    private String name;
    @ElementCollection
    private List<Genre> genres;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String summary;
    @OneToOne(cascade = CascadeType.ALL)
    private CoverImage cover;
    @ElementCollection
    private List<Company> involvedCompanies;
    @ElementCollection
    private List<Platform> platforms;
    @Version
    private Long version;
    @Column(nullable = false, name="total_rating")
    private double totalRating;
    @Column(nullable = false, name="total_rating_count")
    private int totalRatingCount;
    @Column(nullable = false, name="first_release_date")
    private long firstReleaseDate;

    public Game() {
    }

    @Override
    public String toString() {
        return String.format("Name: %s, Summary: %s", name, summary);
    }

}
