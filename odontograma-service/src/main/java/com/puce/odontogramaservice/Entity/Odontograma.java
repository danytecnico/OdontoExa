package com.puce.odontogramaservice.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "odontograma")
@Getter
@Setter
@NoArgsConstructor
public class Odontograma implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer paciente_id;


    private Double caries_pos_X;
    private Double caries_pos_Y;

    private Double zarro_pos_X;
    private Double zarro_pos_Y;

    private Double manchas_pos_X;
    private Double manchas_pos_Y;



}
