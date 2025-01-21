package com.portfolio.portfolio.service;
import com.portfolio.portfolio.entity.Visitor;
import com.portfolio.portfolio.repository.VisitorRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;

   
    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    public Visitor saveVisitor(Visitor visitor) {
        return visitorRepository.save(visitor);
    }

    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    public Visitor getVisitorById(Long id) {
        return visitorRepository.findById(id).orElse(null);
    }
}

