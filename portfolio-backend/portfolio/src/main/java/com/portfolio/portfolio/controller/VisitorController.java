package com.portfolio.portfolio.controller;

import org.springframework.web.bind.annotation.*;

import com.portfolio.portfolio.entity.Visitor;
import com.portfolio.portfolio.service.VisitorService;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorService visitorService;

  
    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @PostMapping
    public Visitor addVisitor(@RequestBody Visitor visitor) {
        return visitorService.saveVisitor(visitor);
    }

    @GetMapping
    public List<Visitor> getAllVisitors() {
        return visitorService.getAllVisitors();
    }

    @GetMapping("/{id}")
    public Visitor getVisitorById(@PathVariable Long id) {
        return visitorService.getVisitorById(id);
    }
}

