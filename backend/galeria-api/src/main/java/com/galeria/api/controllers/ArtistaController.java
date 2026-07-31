package com.galeria.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artistas")
public class ArtistaController {

	@Autowired
	private ArtistaRepository repository;
	
	@GetMapping
	public List<Artista> listar() {
		return repository.findAll();
	}
	
	@PostMapping
	public Artista salvar(@RequestBody Artista artista) {
		return repository.save(artista);
	}
	
}
