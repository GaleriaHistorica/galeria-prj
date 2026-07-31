package com.galeria.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galeria.api.entities.Artistas;
import com.galeria.api.repositories.ArtistasRepository;

@Service
public class ArtistaService {

	@Autowired
	private ArtistasRepository repository;
	
	public List<Artistas> listarTodos() {
		return repository.findAll();
	}
	
	public Artistas buscarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new RuntimeException("Artista não encontrado"));
	}
	
	public Artistas salvar(Artistas artista) {
		return repository.save(artista);
	}
	
	public Artistas atualizar(Long id, Artistas artistaNovo) {
		Artistas artistaAntigo = buscarPorId(id);
		return repository.save(artistaAntigo);
	}
	
	public void excluir(Long id) {
		repository.deleteById(id);
	}
	
}
