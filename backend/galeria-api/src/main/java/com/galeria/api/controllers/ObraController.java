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

import com.galeria.api.entities.EstiloHistorico;
import com.galeria.api.entities.Obras;
import com.galeria.api.service.ObraService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/obras")
public class ObraController {

	@Autowired
	private ObraService service;
	
	@GetMapping
	public List<Obras> listar() {
		List<Obras> obras = service.listarTodos();
		return obras;
	}
	
	@GetMapping("/{id}")
	public Obras buscarPorId(@PathVariable Long id) {
		Obras obras = service.buscarPorId(id);
		return obras;
	}
	
	@PostMapping
	public Obras salvar(@Valid @RequestBody Obras obras) {
		Obras obraSalva = service.salvar(obras);
		return obraSalva;
	}
	
	@PutMapping("/{id}")
	public Obras atualizar(@PathVariable Long id, @RequestBody @Valid Obras obraAtualizado){
		Obras obras = service.atualizar(id, obraAtualizado);
		return obras;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.excluir(id);
		return;
		
	}
	
}
