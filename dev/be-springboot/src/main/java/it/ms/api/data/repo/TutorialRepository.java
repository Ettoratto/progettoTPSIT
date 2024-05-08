package it.ms.api.data.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.ms.api.data.entity.Tutorial;


public interface TutorialRepository extends JpaRepository<Tutorial, Long> {

  List<Tutorial> findByPublished(boolean published);

  List<Tutorial> findByTitleContaining(String title);
  
}