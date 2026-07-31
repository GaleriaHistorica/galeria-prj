package com.galeria.api.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;

@Entity
@Table(name = "tb_artistas")
public class Artistas {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "O nome do produto é obrigatório.")
	@Column(name = "nome_produto", nullable = false, length = 100)
	private String nome;
	
	@Column(name = "url_imagem", unique = true)
	private String urlImagem;
	
	@NotBlank(message = "O produto precisa de uma descrição.")
	@Past(message = "Data de nascimento deve estar no passado.")
	@Column(nullable = false, columnDefinition = "TEXT")
	private String nascimento;
	
	@Column(name = "nacionalidade", nullable = false, precision = 10, scale = 2)
	private String nacionalidade;
	
	@Column(nullable = false, precision = 10, scale = 2)
	private String descricao;
	
	public Artistas() {
		
	}
	public Artistas(String nome, String nascimento, String localNascimento, String descricao) {
		this.nome = nome;
		this.nascimento = nascimento;
		this.nacionalidade = nacionalidade;
		this.descricao = descricao;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getNascimento() {
		return nascimento;
	}
	public void setNascimento(String nascimento) {
		this.nascimento = nascimento;
	}
	public String getLocalNascimento() {
		return nacionalidade;
	}
	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
}
