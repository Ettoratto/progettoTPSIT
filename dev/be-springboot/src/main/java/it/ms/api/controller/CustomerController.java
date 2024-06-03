package it.ms.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

        if (customerRepo.existsByCodiceFiscale(c.getCodiceFiscale())) {
            return ResponseEntity.badRequest().body("{\"response\": \"Customer already exists\"}");
        }
        customerRepo.save(c);
        return ResponseEntity.ok("{\"response\": \"Customer saved\"}");
    }

    @PutMapping("/edit/{cF}")
    public ResponseEntity<String> editRequest(@PathVariable String cF, @RequestBody Customer c) {
        Customer existingCustomer = customerRepo.findByCodiceFiscale(cF);

        if (existingCustomer != null) {
            existingCustomer.setFirst_name(c.getFirst_name());
            existingCustomer.setLast_name(c.getLast_name());
            existingCustomer.setPhone(c.getPhone());
            existingCustomer.setCodiceFiscale(c.getCodiceFiscale());
            existingCustomer.setAddress(c.getAddress());
            existingCustomer.setMedical_certificate_date(c.getMedical_certificate_date());
            existingCustomer.setDate_of_birth(c.getDate_of_birth());
            existingCustomer.setEmail(c.getEmail());
            existingCustomer.setSex(c.getSex());
            existingCustomer.setSubscription(c.getSubscription());

            customerRepo.save(existingCustomer);
            return ResponseEntity.ok("{\"response\": \"Customer edited\"}");
        }

        return ResponseEntity.badRequest().body("{\"response\": \"Customer doesn't exist\"}");
    }


    
    

}
