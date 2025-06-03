package com.vantus.checador.repository;

import com.vantus.checador.model.Administrativo;
import com.vantus.checador.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdministrativoRepository extends JpaRepository<Administrativo, Integer> {
    Optional<Administrativo> findByUsuario(Usuario usuario);
    Optional<Administrativo> findByNumeroEmpleado(String numeroEmpleado);
}
