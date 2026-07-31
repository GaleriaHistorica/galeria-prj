package com.galeria.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObraService {

	@Autowired
	private ObraRepository repository;
	
	public List<Obra> listarTodos() {
		return repository.findAll();
	}
	
	public Obra buscarPorId(Long id) {
		return repository.findById(id).orElse(null);
	}
	
	public Obra salvar(Obra obra) {
		return repository.save(obra);
	}
	
	public Obra atualizar(Long id, Obra obra) {
		obra.setId(id);
		return repository.save(obra);
	}
	
	public void excluir(Long id) {
		repository.deleteById(id);
	}
	
}
