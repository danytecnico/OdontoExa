package com.puce.odontogramaservice.Repository;

import com.puce.odontogramaservice.Entity.Odontograma;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OdontogramaRespository extends JpaRepository<Odontograma, Integer> {
}
