package it.ms.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import it.ms.api.data.repo.AdminRepository;

@Controller
@RequestMapping("admins")
public class AdminController {

    @Autowired AdminRepository adminRepo;

    @GetMapping("/list")
    ResponseEntity<?> admin() {
        return ResponseEntity.ok(adminRepo.findAll());
    }
/* 
    @GetMapping("/{id}")
    public Administator readOne(@PathVariable("id") long id){
        return gymRepo.findById(id).get();
    }

*/

}
