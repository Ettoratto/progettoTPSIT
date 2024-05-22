package it.ms.api.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import it.ms.api.data.entity.Administator;



public interface AdminRepository extends JpaRepository<Administator, Long> {

}