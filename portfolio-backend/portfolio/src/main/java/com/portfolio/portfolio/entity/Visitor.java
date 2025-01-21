package com.portfolio.portfolio.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ipAddress;
    private String browser;
    private String pageVisited;

    @Column(nullable = false, updatable = false)
    private LocalDateTime visitTime;

    // Constructors, getters, and setters
    public Visitor() {
        this.visitTime = LocalDateTime.now(); 
    }

    public Visitor(String ipAddress, String browser, String pageVisited, LocalDateTime visitTime) {
        this.ipAddress = ipAddress;
        this.browser = browser;
        this.pageVisited = pageVisited;
        this.visitTime = LocalDateTime.now(); 
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getBrowser() {
        return browser;
    }

    public void setBrowser(String browser) {
        this.browser = browser;
    }

    public String getPageVisited() {
        return pageVisited;
    }

    public void setPageVisited(String pageVisited) {
        this.pageVisited = pageVisited;
    }

    public LocalDateTime getVisitTime() {
        return visitTime;
    }

    public void setVisitTime(LocalDateTime visitTime) {
        this.visitTime = visitTime;
    }
}
