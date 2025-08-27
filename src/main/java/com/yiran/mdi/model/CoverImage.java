package com.yiran.mdi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.io.Serial;

@Entity
public class CoverImage implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    public Long id;
    public String url;
}