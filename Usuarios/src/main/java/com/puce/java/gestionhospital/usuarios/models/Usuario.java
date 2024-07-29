package com.puce.java.gestionhospital.usuarios.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Column(name = "rol", nullable = false)
    private String rol;

    @Column(name = "creado_en")
    private LocalDateTime creadoEn;

    // Constructor sin ID
    public Usuario(String nombre, String email, String contrasena, String rol) {
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.rol = rol;
    }
}
