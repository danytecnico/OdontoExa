import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";

export default function RegistrarFicha() {
  const [paciente, setPaciente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [pago, setPago] = useState(false);

  const handleSave = async () => {
    const ficha = {
      paciente,
      medication: descripcion,
      budget: presupuesto,
      is_paid: pago,
    };

    try {
      console.log(ficha);
      const response = await axios.post("http://localhost:8083/api/fichas/add", 
         ficha,
      );

      if (response.ok) {
        alert("Ficha técnica registrada con éxito");
        // Limpiar los campos del formulario
        setPaciente("");
        setDescripcion("");
        setPresupuesto("");
        setPago("");
      }
      console.log(response.status)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    // Limpiar los campos del formulario
    setPaciente("");
    setDescripcion("");
    setPresupuesto("");
    setPago("");
  };

  return (
    <div>
      <Navbar />
      <Card sx={{ maxWidth: 345 }}>
        <ContactPageIcon
          sx={{
            color: "primary.main",
            fontSize: "5rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Registrar una nueva ficha
          </Typography>
          <TextField
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            label="Paciente"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            label="Descripción"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            label="Presupuesto"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={pago}
                onChange={() => {
                  setPago(!pago);
                }}
              />
            }
            label="Pagado"
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSave}>
            Guardar
          </Button>
          <Button size="small" onClick={handleCancel}>
            Cancelar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
