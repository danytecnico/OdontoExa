package com.puce.odontogramaservice.Controller;

import com.puce.odontogramaservice.Entity.Odontograma;
import com.puce.odontogramaservice.Repository.OdontogramaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/odontograma")
@CrossOrigin("*")
public class OdontogramaController {
    @Autowired
    private OdontogramaRespository odontogramaRespository;

    @GetMapping
    public List<Odontograma> getAll() {
        return odontogramaRespository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.FOUND)
    public Optional<Odontograma> getById(@PathVariable int id) {
        return odontogramaRespository.findById(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Odontograma create(@RequestBody Odontograma odontograma) {
        return odontogramaRespository.save(odontograma);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Odontograma update(@RequestBody HashMap<String, String> body) {
        Odontograma odontograma = odontogramaRespository.getReferenceById(Integer.valueOf(body.get("id")));
        odontograma.setPaciente_id(Integer.valueOf(body.get("id")));

        odontograma.setCaries_pos_X(Double.valueOf(body.get("caries_pos_X")));
        odontograma.setCaries_pos_Y(Double.valueOf(body.get("caries_pos_Y")));
        odontograma.setZarro_pos_X(Double.valueOf(body.get("zarro_pos_X")));
        odontograma.setZarro_pos_Y(Double.valueOf(body.get("zarro_pos_Y")));
        odontograma.setManchas_pos_X(Double.valueOf(body.get("manchas_pos_X")));
        odontograma.setManchas_pos_Y(Double.valueOf(body.get("manchas_pos_Y")));


        return odontogramaRespository.save(odontograma);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(@RequestBody HashMap<String, String> body) {
        Odontograma odontograma = odontogramaRespository.getReferenceById(Integer.valueOf(body.get("id")));
        odontogramaRespository.delete(odontograma);
    }
}
