package com.vantus.checador.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Alumno")

public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alumno")
    private Integer idAlumno;

    @Column(name = "matricula", nullable = false)
    private String matricula;

    @Column(name = "semestre", nullable = false)
    private Integer semestre;

    @Column(name = "grupo", nullable = false)
    private String grupo;

    @ManyToOne
    @JoinColumn(name = "id_horario")
    private Horario_Sala horario;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    // Setters y Getters
    
    public Integer getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(Integer idAlumno) {
        this.idAlumno = idAlumno;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public Horario_Sala getHorario() {
        return horario;
    }

    public void setHorario(Horario_Sala horario) {
        this.horario = horario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}