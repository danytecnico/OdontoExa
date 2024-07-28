import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Navbar from "./Navbar";

export default function VisualizarPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [newNombrePaciente, setNewNombrePaciente] = useState("");
  const [newSurnamePaciente, setNewSurnamePaciente] = useState("");
  const [newEmailPaciente, setNewEmailPaciente] = useState("");
  const [newAddressPaciente, setNewAddressPaciente] = useState("");
  const [newPhonePaciente, setNewPhonePaciente] = useState("");
  const toast = useRef(null);

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/pacientes");
      setPacientes(response.data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los pacientes' });
    }
  };

  const handleDeletePaciente = async (id) => {
    try {
      await axios.delete("http://localhost:8081/api/pacientes/delete", { data: { id } });
      fetchPacientes();
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente eliminado correctamente' });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el paciente' });
    }
  };

  const handleEditarPaciente = async (paciente) => {
    try {
      await axios.put("http://localhost:8081/api/pacientes/update", {
        id: paciente.id,
        name: newNombrePaciente,
        surname: newSurnamePaciente,
        email: newEmailPaciente,
        address: newAddressPaciente,
        phone: newPhonePaciente
      });
      fetchPacientes();
      setVisible(false);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente actualizado correctamente' });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el paciente' });
    }
  };

  return (
    <>
      <Navbar />
      <Toast ref={toast} />
      <div className="card">
        <DataTable value={pacientes} style={{ minWidth: "50rem" }}>
          <Column field="name" header="Nombre" />
          <Column field="surname" header="Apellido" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Teléfono" />
          <Column field="address" header="Dirección" />
          <Column
            header="Acción"
            body={(paciente) => (
              <div>
                <Button
                  onClick={() => handleDeletePaciente(paciente.id)}
                  icon="pi pi-trash"
                  className="p-button-danger"
                  label="Eliminar"
                />
                <Button
                  onClick={() => {
                    setVisible(true);
                    setSelectedPaciente(paciente);
                    setNewNombrePaciente(paciente.name);
                    setNewSurnamePaciente(paciente.surname);
                    setNewEmailPaciente(paciente.email);
                    setNewAddressPaciente(paciente.address);
                    setNewPhonePaciente(paciente.phone);
                  }}
                  icon="pi pi-pencil"
                  className="p-button-warning"
                  label="Editar"
                  style={{ marginLeft: "10px" }}
                />
              </div>
            )}
          />
        </DataTable>
        <Dialog
          header="Actualizar datos"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedPaciente) {
                handleEditarPaciente(selectedPaciente);
              }
            }}
            style={{ textAlign: "center" }}
          >
            <h1>Editar Paciente</h1>
            <div className="p-field">
              <InputText
                value={newNombrePaciente}
                onChange={(e) => setNewNombrePaciente(e.target.value)}
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div className="p-field">
              <InputText
                value={newSurnamePaciente}
                onChange={(e) => setNewSurnamePaciente(e.target.value)}
                type="text"
                placeholder="Apellido"
              />
            </div>
            <div className="p-field">
              <InputText
                value={newEmailPaciente}
                onChange={(e) => setNewEmailPaciente(e.target.value)}
                type="email"
                placeholder="E-mail"
              />
            </div>
            <div className="p-field">
              <InputText
                value={newAddressPaciente}
                onChange={(e) => setNewAddressPaciente(e.target.value)}
                type="text"
                placeholder="Dirección"
              />
            </div>
            <div className="p-field">
              <InputText
                value={newPhonePaciente}
                onChange={(e) => setNewPhonePaciente(e.target.value)}
                type="text"
                placeholder="Teléfono"
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
    </>
  );
}
