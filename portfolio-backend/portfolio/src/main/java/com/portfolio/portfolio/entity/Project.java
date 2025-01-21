package com.portfolio.portfolio.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String technologies;
    private String link;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors, getters, and setters
    public Project() {
        this.createdAt = LocalDateTime.now(); // Set default createdAt to current time
        
    }

    public Project(String name, String description, String technologies, String link, LocalDateTime createdAt) {
        this.name = name;
        this.description = description;
        this.technologies = technologies;
        this.link = link;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = LocalDateTime.now();
    }
}

