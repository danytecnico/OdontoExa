import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Stage, Layer, Image, Line } from 'react-konva';
import useImage from 'use-image';
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import defaultOdontograma from '../assets/odontograma.png';

const OdontogramaList = () => {
  const [odontogramas, setOdontogramas] = useState([]);
  const [selectedOdontograma, setSelectedOdontograma] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState('#000000');
  const [descripcion, setDescripcion] = useState('');
  const isDrawing = useRef(false);
  const stageRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:8008/api/odontograma')
      .then(response => {
        setOdontogramas(response.data);
      })
      .catch(error => {
        console.error('Error fetching odontogramas', error);
      });
  }, []);

  useEffect(() => {
    if (selectedOdontograma) {
      axios.get(`http://localhost:8008/api/odontograma/${selectedOdontograma.id}/imagen`, { responseType: 'blob' })
        .then(response => {
          const url = URL.createObjectURL(response.data);
          setImageUrl(url);
          setDescripcion(selectedOdontograma.descripcion || '');
        })
        .catch(error => {
          console.error('Error fetching the image', error);
        });
    }
  }, [selectedOdontograma]);

  const handleMouseDown = () => {
    isDrawing.current = true;
    setLines([...lines, { color: color, points: [] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const undoLastLine = () => {
    setLines(lines.slice(0, -1));
    window.location.reload();
  };

  const saveDrawing = async () => {
    const stage = stageRef.current;
    const dataUrl = stage.toDataURL();
    const file = await dataURLToFile(dataUrl, 'odontograma.png');
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      await axios.put(`http://localhost:8008/api/odontograma/${selectedOdontograma.id}/actualizarImg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image saved successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error saving the image', error);
    }
  };

  const dataURLToFile = (dataURL, filename) => {
    const [header, data] = dataURL.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const byteString = atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
  
    return new File([arrayBuffer], filename, { type: mime });
  };

  const uploadDefaultImage = async () => {
    try {
      const response = await fetch(defaultOdontograma);
      const blob = await response.blob();
      const file = new File([blob], 'odontograma.png', { type: blob.type });
      
      const formData = new FormData();
      formData.append('image', file);
  
      await axios.post(`http://localhost:8008/api/odontograma/${selectedOdontograma.id}/subirImg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Default image uploaded successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading the default image', error);
    }
  };

  const saveDescripcion = async () => {
    try {
      await axios.put(`http://localhost:8008/api/odontograma/update/${selectedOdontograma.id}`, {
        ...selectedOdontograma,
        descripcion: descripcion
      });
      console.log('Descripción actualizada correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar la descripción', error);
    }
  };

  const deleteOdontograma = async (id) => {
    try {
      await axios.delete(`http://localhost:8008/api/odontograma/delete/${id}`);
      setOdontogramas(odontogramas.filter(odontograma => odontograma.id !== id));
      if (selectedOdontograma && selectedOdontograma.id === id) {
        setSelectedOdontograma(null);
        setImageUrl(null);
        setLines([]);
        setDescripcion('');
      }
      console.log('Odontograma eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el odontograma', error);
    }
  };

  const [image] = useImage(imageUrl);

  const createOdontograma = async () => {
    // Aquí puedes agregar la lógica para crear un nuevo odontograma
    // Por ejemplo, llamar a una API para crear el odontograma en el backend
    try {
      await axios.post('http://localhost:8008/api/odontograma', {
        // datos del nuevo odontograma
      });
      window.location.reload();
    } catch (error) {
      console.error('Error al crear el odontograma', error);
    }
  };

  return (
    <div>
     { /*<Button 
        label="Crear Odontograma" 
        icon="pi pi-plus" 
        onClick={createOdontograma}
        style={{ marginBottom: '20px' }} 
      />*/}
      <Accordion>
        {odontogramas.map(odontograma => (
          <AccordionTab key={odontograma.id} header={odontograma.paciente} onClick={() => setSelectedOdontograma(odontograma)}>
            <Button 
              label="Eliminar Odontograma" 
              icon="pi pi-trash" 
              className="p-button-danger" 
              onClick={() => deleteOdontograma(odontograma.id)} 
              style={{ marginBottom: '10px' }}
            />
            {selectedOdontograma && selectedOdontograma.id === odontograma.id && (
              <div className="p-card p-4" style={{ maxWidth: '450px', margin: '0 auto' }}>
                <h2>Odontograma de {selectedOdontograma.paciente}</h2>
                <div className="p-field">
                  <label htmlFor="colorPicker">Selecciona el color del lápiz: </label>
                  <ColorPicker 
                    id="colorPicker"
                    value={color} 
                    onChange={(e) => setColor(`#${e.value}`)} 
                    style={{ width: '100%' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stage
                    width={500}
                    height={500}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    ref={stageRef}
                    style={{ border: '1px solid #ccc' }}
                  >
                    <Layer>
                      {image && <Image image={image} width={500} height={500} />}
                      {lines.map((line, i) => (
                        <Line
                          key={i}
                          points={line.points}
                          stroke={line.color}
                          strokeWidth={5}
                          tension={0.5}
                          lineCap="round"
                          globalCompositeOperation="source-over"
                        />
                      ))}
                    </Layer>
                  </Stage>
                </div>
                <div className="p-field" style={{ marginTop: '10px' }}>
                  <label htmlFor="descripcion">Descripción:</label>
                  <InputTextarea 
                    id="descripcion" 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    rows={5} 
                    cols={30} 
                    autoResize 
                    style={{ width: '100%' }}
                  />
                  <Button 
                    label="Guardar Descripción" 
                    icon="pi pi-save" 
                    className="p-button-success" 
                    onClick={saveDescripcion} 
                    style={{ marginTop: '10px' }}
                  />
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <Button 
                    label="Deshacer Cambio" 
                    icon="pi pi-undo" 
                    className="p-button-secondary" 
                    onClick={undoLastLine} 
                  />
                  <Button 
                    label="Guardar Imagen" 
                    icon="pi pi-save" 
                    className="p-button-success" 
                    onClick={saveDrawing} 
                  />
                  <Button 
                    label="Subir Imagen Predeterminada" 
                    icon="pi pi-upload" 
                    className="p-button-warning" 
                    onClick={uploadDefaultImage} 
                  />
                </div>
              </div>
            )}
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
};

export default OdontogramaList;
