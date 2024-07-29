package com.puce.java.gestionhospital.usuarios.controllers;

import com.puce.java.gestionhospital.usuarios.models.Usuario;
import com.puce.java.gestionhospital.usuarios.services.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public Usuario registrarUsuario(@RequestBody Map<String, String> body) {
        String nombre = body.get("nombre");
        String email = body.get("email");
        String contrasena = body.get("contrasena");
        String rol = body.get("rol");
        return usuarioService.registrarUsuario(nombre, email, contrasena, rol);
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario obtenerUsuario(@PathVariable Integer id) {
        return usuarioService.obtenerUsuario(id);
    }

    @PutMapping("/actualizar")
    public Usuario actualizarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.actualizarUsuario(usuario);
    }

    @DeleteMapping("/eliminar")
    public String eliminarUsuario(@RequestParam Integer id) {
        usuarioService.eliminarUsuario(id);
        return "Usuario eliminado con éxito";
    }

    @GetMapping("/email/{email}")
    public Usuario obtenerUsuarioPorEmail(@PathVariable String email) {
        return usuarioService.obtenerUsuarioPorEmail(email);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body, HttpSession session) {
        String email = body.get("email");
        String contrasena = body.get("contrasena");
        Usuario usuario = usuarioService.autenticarUsuario(email, contrasena);
        if (usuario != null) {
            session.setAttribute("usuario", usuario);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("usuario", usuario);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Credenciales inválidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Sesión cerrada con éxito");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentUser(HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        Map<String, Object> response = new HashMap<>();
        if (usuario != null) {
            response.put("success", true);
            response.put("usuario", usuario);
        } else {
            response.put("success", false);
            response.put("message", "No hay usuario autenticado");
        }
        return ResponseEntity.ok(response);
    }

}
