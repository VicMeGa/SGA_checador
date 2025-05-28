package com.vantus.checador.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/sga")
public class SalaController {

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/sala/{id}/estado")
    public ResponseEntity<Map<String, String>> obtenerEstadoSala(
            @PathVariable("id") Long idSala,
            @RequestParam("hora") @DateTimeFormat(pattern = "HH:mm") LocalTime hora,
            @RequestParam("dia") String dia // Ej: "Lunes", "Martes"
    ) {
        String jpql = "SELECT COUNT(hs) FROM Horario_Sala hs " +
                "WHERE hs.sala.id = :idSala " +
                "AND :horaActual BETWEEN hs.horaInicio AND hs.horaFin " +
                "AND hs.dia = :dia";

        Query query = entityManager.createQuery(jpql);
        query.setParameter("idSala", idSala);
        query.setParameter("horaActual", hora);
        query.setParameter("dia", dia);

        Long count = (Long) query.getSingleResult();

        String estado = (count != null && count > 0) ? "Ocupada" : "Disponible";

        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("estado", estado);

        return ResponseEntity.ok(respuesta);
    }

}
