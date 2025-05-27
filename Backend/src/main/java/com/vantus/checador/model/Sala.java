package com.vantus.checador.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Sala")
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sala")
    private Integer idSala;

    @Column(name = "nombre", nullable = false)
    private String nombreSala;

    @Column(name = "capacidad_maxima", nullable = false)
    private Integer capacidadSala;

    @Column(name = "numero_equipos", nullable = false)
    private Integer numeroEquipos;

    // Setters y Getters

    public Integer getIdSala() {
        return idSala;
    }

    public void setIdSala(Integer idSala) {
        this.idSala = idSala;
    }

    public String getNombreSala() {
        return nombreSala;
    }

    public void setNombreSala(String nombreSala) {
        this.nombreSala = nombreSala;
    }

    public Integer getCapacidadSala() {
        return capacidadSala;
    }

    public void setCapacidadSala(Integer capacidadSala) {
        this.capacidadSala = capacidadSala;
    }

    public Integer getNumeroEquipos() {
        return numeroEquipos;
    }

    public void setNumeroEquipos(Integer numeroEquipos) {
        this.numeroEquipos = numeroEquipos;
    }
}