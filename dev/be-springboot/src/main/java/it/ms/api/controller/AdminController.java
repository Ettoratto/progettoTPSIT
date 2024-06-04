package it.ms.api.controller;


import java.sql.Blob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import it.ms.api.data.entity.Administator;
import it.ms.api.data.repo.AdminRepository;

@Controller
@RequestMapping("admins")
public class AdminController {

    @Autowired
    AdminRepository adminRepo;



@PostMapping("/login")
public ResponseEntity<String> loginRequest(@RequestBody Administator a) {
    boolean isValid = !adminRepo.findByUsernAndPassw(a.getUsern(), a.getPassw()).isEmpty();
    System.out.println(isValid);
    if (isValid) {
        return ResponseEntity.ok("{\"valid\": \"true\"}");
    } else {
        return ResponseEntity.ok("{\"valid\": \"false\"}");
    }
}

@GetMapping("/img")
public ResponseEntity<Blob> getImg(@RequestBody String user) {  
    return ResponseEntity.ok(adminRepo.findByUsern(user).getImg());
}

@GetMapping("/{user}")
public ResponseEntity<Blob> getAdmin(@PathVariable String user) {
    return ResponseEntity.ok(adminRepo.findByUsern(user).getImg());
}
}