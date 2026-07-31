package com.galeria.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtistaService {

	@Autowired
	private ArtistaRepository repository;
	
	public List<Artista> listarTodos() {
		return repository.findAll();
	}
	
	public Artista buscarPorId(Long id) {
		return repository.findById(id).orElse(null);
	}
	
	public Artista salvar(Artista artista) {
		return repository.save(artista);
	}
	
	public Artista atualizar(Long id, Artista artista) {
		artista.setId(id);
		return repository.save(artista);
	}
	
	public void excluir(Long id) {
		repository.deleteById(id);
	}
	
}
