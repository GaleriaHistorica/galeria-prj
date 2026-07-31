package com.galeria.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/estilos")
public class EstiloHistoricoController {

	@Autowired
	private EstiloHistoricoRepository repository;
	
	@GetMapping
	public List<EstiloHistorico> listar() {
		return repository.findAll();
	}
	
	@PostMapping
	public EstiloHistorico salvar(@RequestBody EstiloHistorico estilo) {
		return repository.save(estilo);
	}
	
}
