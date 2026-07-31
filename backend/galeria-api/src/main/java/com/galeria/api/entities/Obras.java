package com.galeria.api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tb_obras")
public class Obras {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message="O nome da obra é obrigatório.")
	@Column(name = "nome_obra", unique = false)
	private String nomeObra;
	
	@Column(name = "url_obra", unique = false)
	private String urlObra;
	
	@OneToOne
	@JoinColumn(name = "fk_artistas")
	private Artistas artista;
	
	@NotBlank(message = "a descrição é obrigatória.")
	@Column(name = "descricao")
	private String descricao;

	@Column
	private String data;
	
	public Obras() {
		
	}
	public Obras(String nomeObra, String urlObra, Artistas artista, String descricao, String data) {
		this.nomeObra = nomeObra;
		this.urlObra = urlObra;
		this.artista = artista;
		this.descricao = descricao;
		this.data = data;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNomeObra() {
		return nomeObra;
	}
	public void setNomeObra(String nomeObra) {
		this.nomeObra = nomeObra;
	}
	public String getUrlObra() {
		return urlObra;
	}
	public void setUrlObra(String urlObra) {
		this.urlObra = urlObra;
	}
	public Artistas getArtista() {
		return artista;
	}
	public void setArtista(Artistas artista) {
		this.artista = artista;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	
	
}
