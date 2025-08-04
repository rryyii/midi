package com.yiran.mdi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

/**
 * Baseline User model class for Hibernate.
 * @author rryyii
 */
@Data
@Entity
@Table(name="dmi_users")
public class User {

    public User() {}

    public User(String username, char[] password, Date creationDate, String email) {
        this.username = username;
        this.password = password;
        this.creationDate = creationDate;
        this.email = email;
    }

    @Override
    public String toString() {
        return String.format("Username: %s, Date Created: %s", username, creationDate.toString());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;
    private char[] password;
    private Date creationDate;
    private String email;

}
