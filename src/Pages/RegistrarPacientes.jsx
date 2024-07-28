import React, { useState } from 'react';
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateNewFolderTwoToneIcon from "@mui/icons-material/CreateNewFolderTwoTone";
import TextField from "@mui/material/TextField";
import axios from 'axios';

export default function RegistrarPacientes() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSave = () => {
    const newPaciente = {
      name: nombre,
      surname: apellidos,
      email: email,
      phone: telefono,
      address: direccion
    };

    axios.post('http://localhost:8081/api/pacientes/create', newPaciente)
      .then(response => {
        console.log('Paciente registrado:', response.data);
        // Opcional: limpiar los campos del formulario después de guardar
        setNombre('');
        setApellidos('');
        setEmail('');
        setTelefono('');
        setDireccion('');
      })
      .catch(error => {
        console.error('Hubo un error al registrar el paciente:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <Card sx={{ maxWidth: 345 }}>
        <CreateNewFolderTwoToneIcon
          sx={{
            color: "primary",
            fontSize: "5rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Registrar un nuevo paciente
          </Typography>
          <TextField
            label="Nombre"
            variant="outlined"
            className="my-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Apellidos"
            variant="outlined"
            className="my-2"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            className="my-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            className="my-2"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            className="my-2"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSave}>Guardar</Button>
          <Button size="small">Cancelar</Button>
        </CardActions>
      </Card>
    </div>
  );
}

