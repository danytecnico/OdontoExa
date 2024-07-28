import "@fontsource/roboto/500.css";

import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import RegistrarPacientes from "./Pages/RegistrarPacientes";
import VisualizarPacientes from "./Pages/VisualizarPacientes";
import Ver_Ficha from "./Pages/VerFicha";
import RegistrarFicha from "./Pages/RegistrarFicha";
import Odontograma from "./Pages/Odontograma";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/index/RegistrarPacientes"
            element={<RegistrarPacientes />}
          ></Route>
          <Route
            path="/index/VerPacientes"
            element={<VisualizarPacientes />}
          ></Route>
          <Route path="/index/VerFicha" element={<Ver_Ficha />}></Route>
          <Route
            path="/index/RegistrarFicha"
            element={<RegistrarFicha />}
          ></Route>
          <Route path="/index/Odontograma" element={<Odontograma />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
