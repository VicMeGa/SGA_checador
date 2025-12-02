package com.vantus.checador.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vantus.checador.dto.RegistroAccesoRequest;
import com.vantus.checador.model.Acceso;
import com.vantus.checador.model.Administrativo;
import com.vantus.checador.model.Alumno;
import com.vantus.checador.repository.AccesoRepository;
import com.vantus.checador.repository.AdministrativoRepository;
import com.vantus.checador.repository.AlumnoRepository;
import com.vantus.checador.repository.SalaRepository;
import com.vantus.checador.model.Sala;
import com.vantus.checador.model.Usuario;

import java.util.Date;

import com.vantus.checador.service.HuellaIdentificacionService;
import com.vantus.checador.request.HuellaRequest;


@RestController
@RequestMapping("/sga/acceso")

public class RegistrarController {

    @Autowired
    private AdministrativoRepository administrativoRepo;

    @Autowired
    private HuellaIdentificacionService huellaIdentificacionService;

    @Autowired
    private AccesoRepository accesoRepo;

    @Autowired
    private SalaRepository salaRepo;

    @Autowired
    private AlumnoRepository alumnoRepo;

@PostMapping("/registrar")
public ResponseEntity<String> registrarAcceso(@RequestBody RegistroAccesoRequest request) {
    try {
        String id;

        if ("QR".equalsIgnoreCase(request.getTipoAcceso())) {
            // Extraer el número de empleado o matrícula del contenido del QR
            String[] lineas = request.getCodigoQr().split("\n");
            id = Arrays.stream(lineas)
                    .filter(l -> l.startsWith("ID:"))
                    .map(l -> l.replace("ID:", "").trim())
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("No se encontró el ID en el código QR"));
        } else if ("HUELLA".equalsIgnoreCase(request.getTipoAcceso())) {
            // En simulación, el código QR contiene directamente el número de empleado o matrícula
            id = request.getCodigoQr().trim();
        } else {
            throw new RuntimeException("Tipo de acceso no soportado: " + request.getTipoAcceso());
        }

        // Intentar buscar como administrativo primero
        Optional<Administrativo> adminOpt = administrativoRepo.findByNumeroEmpleado(id);
        Optional<Alumno> alumnoOpt = alumnoRepo.findByMatricula(id);

        Usuario usuario;

        if (adminOpt.isPresent()) {
            usuario = adminOpt.get().getUsuario();
        } else if (alumnoOpt.isPresent()) {
            usuario = alumnoOpt.get().getUsuario();
        } else {
            throw new RuntimeException("No se encontró ningún usuario con ese ID (ni administrativo ni alumno)");
        }

        Sala sala = salaRepo.findById(request.getIdSala())
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));

        Acceso acceso = new Acceso();
        acceso.setFechaHoraEntrada(LocalDateTime.now());
        acceso.setTipoAcceso(Acceso.TipoAcceso.valueOf(request.getTipoAcceso()));
        acceso.setUsuario(usuario);
        acceso.setSala(sala);

        accesoRepo.save(acceso);

        return ResponseEntity.ok("✅ Acceso registrado correctamente");

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("❌ Error al registrar acceso: " + e.getMessage());
    }
}


@PostMapping("/registrarHuella")
public ResponseEntity<?> registrarAccesoPorHuella(@RequestBody HuellaRequest req) {

    Usuario usuario = huellaIdentificacionService.identificarUsuario(req.getHuella());

    if (usuario == null) {
        return ResponseEntity.status(401).body("❌ Huella no identificada");
    }

    Sala sala = salaRepo.findById(req.getIdSala())
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));

    // Registrar acceso
    Acceso acceso = new Acceso();
    acceso.setUsuario(usuario);
    //acceso.setUsuarioId(usuario.getId());
    acceso.setTipoAcceso(Acceso.TipoAcceso.valueOf("Huella"));
    acceso.setSala(sala);
    acceso.setFechaHoraEntrada(LocalDateTime.now());

    accesoRepo.save(acceso);

    return ResponseEntity.ok("✔ Acceso registrado para " + usuario.getNombre());
}



}
