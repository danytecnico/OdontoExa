import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';
import imagen from '../assets/img.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/usuarios/login', {
        email,
        contrasena
      });

      if (response.data.success) {
        // Login exitoso, redirige a la página deseada
        navigate('/index/RegistrarFicha');
      } else {
        // Login fallido
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error al intentar iniciar sesión.');
    }
  };

  return (
    <body>
      <style>{`
        html {
          font-size: 14px;
        }
        body {
          font-family: var(--font-family);
          font-weight: normal;
          background: url('https://cdn.discordapp.com/attachments/1245850011254788229/1265745996969934899/image.png?ex=66a54452&is=66a3f2d2&hm=f1572611949753c859538d7b8327aa1b631a9a251fc9079ba3d460acfdafdcd0&') no-repeat center center fixed;
          background-size: cover;
          color: var(--text-color);
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: rgba(173, 216, 230, 0.5);
          padding: 2rem;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
      `}</style>
      <div className="card">
        <form onSubmit={handleLogin}>
          <div className="flex flex-column md:flex-row">
            <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <label className="w-6rem">Email</label>
                <InputText
                  id="email"
                  type="email"
                  className="w-12rem"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <label className="w-6rem">Password</label>
                <InputText
                  type="password"
                  className="w-12rem"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Button
                type="submit"
                label="Login"
                icon="pi pi-user"
                className="w-10rem mx-auto"
              />
            </div>
            <div className="w-full md:w-2">
              <Divider layout="vertical" className="hidden md:flex">
                <b>OR</b>
              </Divider>
              <Divider layout="horizontal" className="flex md:hidden" align="center">
                <b>OR</b>
              </Divider>
            </div>
            <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
              <h1>Bienvenido</h1>
            </div>
          </div>
        </form>
      </div>
    </body>
  );
}
