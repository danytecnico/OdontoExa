import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Navbar from "./Navbar";

export default function Ver_Ficha() {
  const [fichas, setFichas] = useState([]);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    paciente: "",
    medication: "",
    budget: "",
    _paid: "",
  });

  const toast = useRef(null);

  useEffect(() => {
    fetchFichas();
  }, []);

  const fetchFichas = async () => {
    try {
      const response = await axios.get("http://localhost:8083/api/fichas");
      setFichas(response.data);
    } catch (error) {
      showToast("error", "Error", "Error al cargar las fichas técnicas");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEdit = (ficha) => {
    setSelectedFicha(ficha);
    setFormValues({
      id: ficha.id,
      paciente: ficha.paciente,
      medication: ficha.medication,
      budget: ficha.budget,
      _paid: ficha._paid,
    });
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8083/api/fichas/delete`, {
        data: { id },
      });
      showToast("success", "Éxito", "Ficha técnica eliminada con éxito");
      fetchFichas();
    } catch (error) {
      showToast("error", "Error", "Error al eliminar la ficha técnica");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFicha) {
        await axios.put("http://localhost:8083/api/fichas/update", formValues);
        showToast("success", "Éxito", "Ficha técnica actualizada con éxito");
      } else {
        await axios.post("http://localhost:8083/api/fichas/add", formValues);
        showToast("success", "Éxito", "Ficha técnica agregada con éxito");
      }
      setVisible(false);
      fetchFichas();
    } catch (error) {
      showToast("error", "Error", "Error al guardar la ficha técnica");
    }
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  return (
    <div>
      <Navbar />
      <Toast ref={toast} />
      <div className="card">
        <Button
          label="Nueva Ficha"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
        <DataTable value={fichas} style={{ minWidth: "50rem" }}>
          <Column field="paciente" header="Paciente" />
          <Column field="medication" header="Medicación" />
          <Column field="budget" header="Presupuesto" />
          <Column field="_paid" header="Pago" />
          <Column
            header="Acción"
            body={(ficha) => (
              <div>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-warning"
                  label="Editar"
                  onClick={() => handleEdit(ficha)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger"
                  label="Eliminar"
                  onClick={() => handleDelete(ficha.id)}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            )}
          />
        </DataTable>
        <Dialog
          header={selectedFicha ? "Actualizar datos" : "Nueva Ficha"}
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <h1>{selectedFicha ? "Editar Paciente" : "Nuevo Paciente"}</h1>
            <div className="p-field">
              <InputText
                type="text"
                placeholder="Medicación"
                name="medication"
                value={formValues.medication}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-field">
              <InputText
                type="text"
                placeholder="Presupuesto"
                name="budget"
                value={formValues.budget}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-field">
              <InputText
                type="text"
                placeholder="Pago"
                name="_paid"
                value={formValues._paid}
                onChange={handleInputChange}
              />
            </div>
            <Button
              icon="pi pi-save"
              className="p-button-success"
              label="Guardar"
              type="submit"
              style={{ marginTop: "10px" }}
            />
          </form>
        </Dialog>
      </div>
    </div>
  );
}
