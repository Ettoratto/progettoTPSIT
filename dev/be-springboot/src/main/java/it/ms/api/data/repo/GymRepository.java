package it.ms.api.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import it.ms.api.data.entity.Administator;


public interface GymRepository extends JpaRepository<Administator, Long> {

  //List<Administator> findByPublished(boolean published);

  //List<Administator> findByTitleContaining(String title);
  
}