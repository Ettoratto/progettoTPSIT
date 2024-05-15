package it.ms.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.ms.api.data.entity.Administator;
import it.ms.api.data.repo.GymRepository;

@Controller
@RequestMapping("users")
public class TestController {

    @Autowired GymRepository gymRepo;

    @GetMapping("/list")
    ResponseEntity<?> persons() {
        return ResponseEntity.ok(gymRepo.findAll());
    }

    @GetMapping("/{id}")
    public Administator readOne(@PathVariable("id") long id){
        return gymRepo.findById(id).get();
    }



}
