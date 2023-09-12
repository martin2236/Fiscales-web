import { useState, useEffect, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import { UbicationView } from './UbicationView';
import { TableView } from './TableView';
import { RegisterView } from './RegisterView';
import { FiscalContext } from '../context/FiscalContext';

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


export const HomeView = () => {
  const [value, setValue] = useState(0);
  const {user,coords} = useContext(FiscalContext)

  const handleChange = (event: any) => {
    setValue(event);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Sistema de gestión de Fiscales</Navbar.Brand>
        </Container>
      </Navbar>

     {
        user && 
        <Tabs
            activeKey={value}
            onSelect={handleChange}
            variant="tabs"
            fill
            className="mb-3 bg-primary" 
            data-bs-theme="dark"
        >
            <Tab eventKey={0} title="Ubicación de los Fiscales">
                <UbicationView user={user} coords={coords} />
            </Tab>
            <Tab eventKey={1} title="Tabla de datos de los Fiscales">
                <TableView user={user} />
            </Tab>
            <Tab eventKey={2} title="Cargar Fiscales">
                <RegisterView user={user} />
            </Tab>
      </Tabs>
     }
    </>
  );
};
