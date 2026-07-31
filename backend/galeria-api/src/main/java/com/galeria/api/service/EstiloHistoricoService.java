package com.galeria.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galeria.api.entities.EstiloHistorico;
import com.galeria.api.repositories.EstiloHistoricoRepository;

@Service
public class EstiloHistoricoService {

	@Autowired
	private EstiloHistoricoRepository repository;
	
	public List<EstiloHistorico> listarTodos() {
		return repository.findAll();
	}
	
	public EstiloHistorico buscarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new RuntimeException("Estilo não encontrado"));
	}
	
	public EstiloHistorico salvar(EstiloHistorico estilo) {
		return repository.save(estilo);
	}
	
	public EstiloHistorico atualizar(Long id, EstiloHistorico estilo) {
		EstiloHistorico estiloAntigo = buscarPorId(id);
		return repository.save(estiloAntigo);
	}
	
	public void excluir(Long id) {
		repository.deleteById(id);
	}
	
}
