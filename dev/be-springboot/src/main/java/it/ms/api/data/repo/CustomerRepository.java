package it.ms.api.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import it.ms.api.data.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByCodiceFiscale(String codiceFiscale);

    Customer findByCodiceFiscale(String cF);
}