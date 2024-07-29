package com.puce.java.gestionhospital.usuarios.services;

import com.puce.java.gestionhospital.usuarios.models.Usuario;
import com.puce.java.gestionhospital.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    public Usuario registrarUsuario(String nombre, String email, String contrasena, String rol) {
        Usuario usuario = new Usuario(nombre, email, contrasena, rol);
        return usuarioRepo.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepo.findAll();
    }

    public Usuario obtenerUsuario(Integer id) {
        return usuarioRepo.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        Usuario existente = obtenerUsuario(usuario.getId());
        existente.setNombre(usuario.getNombre());
        existente.setEmail(usuario.getEmail());
        existente.setContrasena(usuario.getContrasena());
        existente.setRol(usuario.getRol());
        return usuarioRepo.save(existente);
    }

    public void eliminarUsuario(Integer id) {
        Usuario usuario = obtenerUsuario(id);
        usuarioRepo.delete(usuario);
    }

    public Usuario obtenerUsuarioPorEmail(String email) {
        return usuarioRepo.findByEmail(email);
    }

    public Usuario autenticarUsuario(String email, String contrasena) {
        Usuario usuario = usuarioRepo.findByEmail(email);
        if (usuario != null && usuario.getContrasena().equals(contrasena)) {
            return usuario;
        } else {
            return null;
        }
    }
}
