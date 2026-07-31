package com.galeria.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galeria.api.entities.Obras;
import com.galeria.api.repositories.ObrasRepository;

@Service
public class ObraService {

	@Autowired
	private ObrasRepository repository;
	
	public List<Obras> listarTodos() {
		return repository.findAll();
	}
	
	public Obras buscarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new RuntimeException("Estilo não encontrado"));
	}
	
	public Obras salvar(Obras obra) {
		return repository.save(obra);
	}
	
	public Obras atualizar(Long id, Obras obra) {
		Obras obraAntiga = buscarPorId(id);
		return repository.save(obraAntiga);
	}
	
	public void excluir(Long id) {
		repository.deleteById(id);
	}
	
}
