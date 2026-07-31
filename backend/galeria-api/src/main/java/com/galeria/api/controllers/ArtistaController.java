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
import com.galeria.api.service.ArtistaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/artistas")
public class ArtistaController {

	@Autowired
	private ArtistaService service;
	
	@GetMapping
	public List<Artistas> listar() {
		List<Artistas> artistas = service.listarTodos();
		return artistas;
	}
	
	@GetMapping("/{id}")
	public Artistas buscarPorId(@PathVariable Long id) {
		Artistas artista = service.buscarPorId(id);
		return artista;
	}
	
	@PostMapping
	public Artistas salvar(@Valid @RequestBody Artistas artista) {
		Artistas artistaSalvo = service.salvar(artista);
		return artistaSalvo;
	}
	
	@PutMapping("/{id}")
	public Artistas atualizar(@PathVariable Long id, @RequestBody @Valid Artistas artistaAtualizado){
		Artistas artistas = service.atualizar(id, artistaAtualizado);
		return artistas;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.excluir(id);
		return;
		
	}
	
}
