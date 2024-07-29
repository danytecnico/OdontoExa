package com.wannacode.tecnicasmicroservice.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "fichas")
@Getter
@Setter
@NoArgsConstructor
public class FichaTecnicas implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String paciente;
    private Double budget;
    private String medication;
    private boolean is_paid;


}



