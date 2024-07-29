package com.wannacode.paciento.Controlller;


import com.wannacode.paciento.Entity.Paciente;
import com.wannacode.paciento.Repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin("*")
public class PacienteController {

    @Autowired
    private PacienteRepository PacienteRepository;

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Paciente> getAllPaciente() {
        return PacienteRepository.findAll();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Paciente addPaciente(@RequestBody Paciente paciente) {
        return PacienteRepository.save(paciente);
    }

    @GetMapping("{id}")
    @ResponseStatus (HttpStatus. FOUND)
    public Optional<Paciente> getPaciente (@PathVariable int id) {
        return PacienteRepository.findById(id);
    }


    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Paciente updatePaciente (@RequestBody HashMap<String, String> body) {
        Paciente paciente = PacienteRepository.getReferenceById(Integer.valueOf(body.get("id")));
        paciente.setName(body.get("name"));
        paciente.setSurname(body.get("surname"));
        return PacienteRepository.save(paciente);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePaciente(@RequestBody HashMap<String, Integer> body){
    Paciente paciente = PacienteRepository.getById(body.get("id"));
    PacienteRepository.delete(paciente);
    return new ResponseEntity<>("Paciente deleted successfully", HttpStatus.OK);
    }
}