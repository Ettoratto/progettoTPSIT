package it.ms.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.ms.api.data.entity.Administator;
import it.ms.api.data.repo.GymRepository;

@RestController
@RequestMapping("users")
public class TestController {

    @Autowired GymRepository gymRepo;



    @GetMapping("list") //select all
    public List<Administator> list() {
        return gymRepo.findAll();
    }



}
