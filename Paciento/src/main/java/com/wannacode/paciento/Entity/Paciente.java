package com.wannacode.paciento.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
@Entity
@Table (name = "pacientes")
@NoArgsConstructor
@Getter
@Setter
public class Paciente implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String surname;
    private String address;
    private String phone;
    private String email;
}


