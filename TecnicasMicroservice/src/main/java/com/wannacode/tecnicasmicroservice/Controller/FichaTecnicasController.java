package com.wannacode.tecnicasmicroservice.Controller;

import com.wannacode.tecnicasmicroservice.Entity.FichaTecnicas;
import com.wannacode.tecnicasmicroservice.Repository.FichaTecnicasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fichas")
@CrossOrigin("*")
public class FichaTecnicasController {

    @Autowired
    private FichaTecnicasRepository fichaTecnicasRepository;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FichaTecnicas> findAll() {
        return fichaTecnicasRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaTecnicas> findById(@PathVariable Integer id) {
        Optional<FichaTecnicas> fichaTecnicas = fichaTecnicasRepository.findById(id);
        return fichaTecnicas.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<FichaTecnicas> add(@RequestBody FichaTecnicas fichaTecnicas) {
        if (fichaTecnicas.getPaciente() == null || fichaTecnicas.getPaciente().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        FichaTecnicas savedFicha = fichaTecnicasRepository.save(fichaTecnicas);
        return new ResponseEntity<>(savedFicha, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<FichaTecnicas> update(@RequestBody HashMap<String, String> body) {
        Optional<FichaTecnicas> fichaTecnicasOptional = fichaTecnicasRepository.findById(Integer.valueOf(body.get("id")));
        if (fichaTecnicasOptional.isPresent()) {
            FichaTecnicas fichaTecnica = fichaTecnicasOptional.get();
            fichaTecnica.setMedication(body.get("medication"));
            fichaTecnica.setPaciente(body.get("paciente"));
            fichaTecnica.setBudget(Double.valueOf(body.get("budget")));
            fichaTecnica.set_paid(Boolean.parseBoolean(body.get("is_paid")));

            return new ResponseEntity<>(fichaTecnicasRepository.save(fichaTecnica), HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody HashMap<String, String> body) {
        if (fichaTecnicasRepository.existsById(Integer.valueOf(body.get("id")))) {
            fichaTecnicasRepository.deleteById(Integer.valueOf(body.get("id")));
            return new ResponseEntity<>("Ficha técnica eliminada con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Ficha técnica no encontrada", HttpStatus.NOT_FOUND);
        }
    }
}


