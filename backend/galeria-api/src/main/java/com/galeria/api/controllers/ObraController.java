package com.galeria.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/obras")
public class ObraController {

	@Autowired
	private ObraRepository repository;
	
	@GetMapping
	public List<Obra> listar() {
		return repository.findAll();
	}
	
	@PostMapping
	public Obra salvar(@RequestBody Obra obra) {
		return repository.save(obra);
	}
	
}
