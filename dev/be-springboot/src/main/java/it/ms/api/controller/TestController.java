package it.ms.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.ms.api.data.entity.Tutorial;
import it.ms.api.data.repo.TutorialRepository;

@RestController
@RequestMapping("tutorials")
public class TestController {

    @Autowired TutorialRepository tutorialRepo;



    @GetMapping("list")
    public List<Tutorial> list() {
        return tutorialRepo.findAll();
    }



}
