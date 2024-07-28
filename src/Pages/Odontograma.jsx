import Navbar from "./Navbar";
import OdontogramaList from "../Componenst/OdontogramaList";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import React, { useState } from "react";

export default function Odontograma() {
  const [paciente, setPaciente] = useState("");

  const createOdontograma = async () => {
    try {
      const response = await axios.post("http://localhost:8008/api/odontograma/create", {
        id: null,
        paciente: paciente,
        descripcion: null,
        img_url: null
      });
      console.log("Odontograma creado:", response.data);
      // Aquí puedes agregar lógica adicional para manejar la respuesta, como actualizar una lista de odontogramas
    } catch (error) {
      console.error("Error creando odontograma:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Odontogramas</h2>
      <div>
        <InputText
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
          placeholder="Ingrese el nombre del paciente"
        />
        <Button label="Crear Odontograma" icon="pi pi-plus" onClick={createOdontograma} />
      </div>
      <OdontogramaList />
    </div>
  );
}
