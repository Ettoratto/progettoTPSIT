package it.ms.api.data.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.ms.api.data.entity.Administator;



public interface AdminRepository extends JpaRepository<Administator, Long> {

  List<Administator> findByUsernAndPassw(String usern, String passw);
  Administator findByUsern(String usern);

}