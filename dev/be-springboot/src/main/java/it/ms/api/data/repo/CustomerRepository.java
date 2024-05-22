package it.ms.api.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import it.ms.api.data.entity.Customers;



public interface CustomerRepository extends JpaRepository<Customers, Long> {

  
}