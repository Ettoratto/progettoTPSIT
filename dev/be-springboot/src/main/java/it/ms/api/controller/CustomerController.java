package it.ms.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import it.ms.api.data.entity.Customer;
import it.ms.api.data.repo.CustomerRepository;

@Controller
@RequestMapping("users")
public class CustomerController {

    @Autowired CustomerRepository customerRepo;

    @GetMapping("/list")
    ResponseEntity<?> customer() {
        return ResponseEntity.ok(customerRepo.findAll());
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerRequest(@RequestBody Customer c) {

        if (customerRepo.existsByCodiceFiscale(c.getCodice_fiscale())) {
            return ResponseEntity.badRequest().body("{\"response\": \"Customer already exists\"}");
        }
        customerRepo.save(c);
        return ResponseEntity.ok("{\"response\": \"Customer saved\"}");


    }
    
    

}
