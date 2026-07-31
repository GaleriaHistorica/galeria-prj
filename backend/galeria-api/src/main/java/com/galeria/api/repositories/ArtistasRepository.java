package com.galeria.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.galeria.api.entities.Artistas;

public interface ArtistasRepository extends JpaRepository<Artistas, Long> {

}
