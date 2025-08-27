package com.yiran.mdi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.util.Date;

/**
 * Baseline User model class for Hibernate.
 *
 * @author rryyii
 */
@Data
@Entity
@Table(name = "users")
public class User implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Date creationDate;
    private String email;
    private String password;
    private String username;
    private String bio;


    public User() {
    }

    @Override
    public String toString() {
        return String.format("Username: %s, Date Created: %s", username, email);
    }

}
