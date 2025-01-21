package com.portfolio.portfolio.repository;

import org.springframework.stereotype.Repository;

import com.portfolio.portfolio.entity.Visitor;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor,Long> {
    
}
