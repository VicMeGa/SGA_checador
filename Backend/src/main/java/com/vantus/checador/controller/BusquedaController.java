package com.vantus.checador.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vantus.checador.model.Sala;
import com.vantus.checador.repository.SalaRepository;
@RestController
@RequestMapping("/sga/buscar")
public class BusquedaController {

    @Autowired
    private SalaRepository salaRepo;

    @GetMapping("/salas")
    public ResponseEntity<List<Sala>> obtenerSalas() {
        List<Sala> salas = salaRepo.findAll();
        return ResponseEntity.ok(salas);
    }
}