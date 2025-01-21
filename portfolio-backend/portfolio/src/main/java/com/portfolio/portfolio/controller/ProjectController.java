package com.portfolio.portfolio.controller;

import org.springframework.web.bind.annotation.*;

import com.portfolio.portfolio.entity.Project;
import com.portfolio.portfolio.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Endpoint to create a new project
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    // Endpoint to get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Endpoint to get a project by ID
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    // Endpoint to update a project
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    // Endpoint to delete a project
    @DeleteMapping("/{id}")
    public boolean deleteProject(@PathVariable Long id) {
        return projectService.deleteProject(id);
    }
}

