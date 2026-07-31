package com.galeria.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galeria.api.entities.Artistas;
import com.galeria.api.entities.EstiloHistorico;
import com.galeria.api.service.EstiloHistoricoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/estilos")
public class EstiloHistoricoController {

	@Autowired
	private EstiloHistoricoService service;
	
	@GetMapping
	public List<EstiloHistorico> listar() {
		List<EstiloHistorico> estilo = service.listarTodos();
		return estilo;
	}
	
	@GetMapping("/{id}")
	public EstiloHistorico buscarPorId(@PathVariable Long id) {
		EstiloHistorico estilo = service.buscarPorId(id);
		return estilo;
	}
	
	@PostMapping
	public EstiloHistorico salvar(@Valid @RequestBody EstiloHistorico estilo) {
		EstiloHistorico estiloSalvo = service.salvar(estilo);
		return estiloSalvo;
	}
	
	@PutMapping("/{id}")
	public EstiloHistorico atualizar(@PathVariable Long id, @RequestBody @Valid EstiloHistorico estiloAtualizado){
		EstiloHistorico estilo = service.atualizar(id, estiloAtualizado);
		return estilo;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.excluir(id);
		return;
		
	}
	
}
