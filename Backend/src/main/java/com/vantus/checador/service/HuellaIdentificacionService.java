package com.vantus.checador.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import com.vantus.checador.model.Usuario;
import com.vantus.checador.repository.UsuarioRepository;

@Service
public class HuellaIdentificacionService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private HuellaService huellaService; // el que tú ya tienes

    public Usuario identificarUsuario(String base64HuellaCapturada) {
        List<Usuario> usuarios = usuarioRepo.findAll();

        for (Usuario u : usuarios) {
            byte[] templateGuardado = u.getTemplate();
            if (templateGuardado == null) continue;

            boolean coincide = huellaService.verificarHuella(
                base64HuellaCapturada,
                templateGuardado
            );

            if (coincide) {
                return u;
            }
        }

        return null;
    }
}
