package com.puce.java.gestionhospital.usuarios.repository;

import com.puce.java.gestionhospital.usuarios.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Puedes agregar métodos personalizados aquí si es necesario
    Usuario findByEmail(String email);
}
