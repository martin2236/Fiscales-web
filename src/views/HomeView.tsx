import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import { UbicationView } from './UbicationView';
import { TableView } from './TableView';
import { RegisterView } from './RegisterView';

export interface User {
  apellido: string;
  dni: string;
  email: string;
  escuela: string;
  id: number;
  localidad: string;
  mesa: string;
  nombre: string;
  rol: string;
  session_token: string;
}

const userInitValues = {
  apellido: '',
  dni: '',
  email: '',
  escuela: '',
  id: 0,
  localidad: '',
  mesa: '',
  nombre: '',
  rol: '',
  session_token: '',
};

export const HomeView = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(userInitValues);
  const [coordenadas, setCoordenadas] = useState({
    lat: 0,
    lon: 0,
  });

  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    if (data.id) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordenadas({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('La geolocalización no es compatible con este navegador.');
    }
  }, []);

  const handleChange = (event: any) => {
    setValue(event);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Sistema de gestión de Fiscales</Navbar.Brand>
          {/*<Nav className="ml-auto">
            <Nav.Link>Perfil</Nav.Link>
            <Nav.Link>Cerrar Sesión</Nav.Link>
          </Nav>*/}
        </Container>
      </Navbar>

      <Tabs
        activeKey={value}
        onSelect={handleChange}
        variant="tabs"
        fill
        className="mb-3 bg-primary" 
        data-bs-theme="dark"
      >
        <Tab eventKey={0} title="Ubicación de los Fiscales">
          <UbicationView user={user} coords={coordenadas} />
        </Tab>
        <Tab eventKey={1} title="Tabla de datos de los Fiscales">
          <TableView user={user} />
        </Tab>
        <Tab eventKey={2} title="Cargar Fiscales">
          <RegisterView user={user} />
        </Tab>
      </Tabs>
    </>
  );
};
