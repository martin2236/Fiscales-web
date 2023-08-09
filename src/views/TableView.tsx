import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { User } from './HomeView';
import { baseIp } from '../config/conection';
import { TablePagination } from '../components/TablePagination';
import  Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container  from 'react-bootstrap/Container';
import { UserRow } from '../components/ResponsiveRow';
import lupa from '../assets/icons/lupa.png'

interface Props {
  user: User;
}

interface FormData {
  nombre: string;
  dni: string;
  localidad: string;
  parametro:string
}

export const TableView = ({ user }: Props) => {
  const [filtro, setFiltro] = useState('nombre');
  const [rows, setRows] = useState([]);
  const [cant,setCant] = useState(10)
  const [shownUsers,setShownUsers] = useState(rows);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);  
  const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobileView(window.innerWidth < 730); 
        };
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      
        const altura = screenHeight - 200;
        const updateScreenHeight = () => {
            setScreenHeight(window.innerHeight);
        };

        useEffect(() => {
            window.addEventListener('resize', updateScreenHeight);
            return () => {
            window.removeEventListener('resize', updateScreenHeight);
            };
        }, []);
  

  useEffect(() => {
    if(user.session_token){ 
    fetch(`${baseIp}/fiscales/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${user.session_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(user.session_token);
        setRows(data.data);
        setShownUsers(data.data);
      })
      .catch((error) => console.log(error));
    }else{
        console.log('no se encontro el token')
    }
  }, [user.session_token]);

  const initialValues: FormData = {
    nombre: '',
    dni: '',
    localidad: '',
    parametro:''
  };
 let validationSchema;
  const onSubmit = (values: FormData, { resetForm }: any) => {
    console.log(values);
    const buscar: any = {};
    const { nombre, dni, localidad } = values;
    if (nombre !== '') {
      buscar.filtro = 'nombre';
      buscar.valor = nombre.replace(' ', '%20');
    } else if (dni !== '') {
      buscar.filtro = 'dni';
      buscar.valor = dni;
    } else if (localidad !== '') {
      buscar.filtro = 'localidad';
      buscar.valor = localidad;
    }
    fetch(`${baseIp}/fiscales/${buscar.filtro}/${buscar.valor}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${user.session_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setRows(data.data);
        }
      })
      .catch((error) => console.log(error));
    resetForm();
  };

  switch (filtro) {
    case 'nombre':
      validationSchema = yup.object({
        nombre: yup.string().required('Ingrese un nombre'),
      });
      break;
    case 'dni':
      validationSchema = yup.object({
        dni: yup.string().required('Ingrese un dni'),
      });
      break;
    case 'localidad':
      validationSchema = yup.object({
        localidad: yup.string().required('Ingrese una localidad'),
      });
      break;
    default:
      break;
  }

  const handleChange = (event: any) => {
    setFiltro(event.target.value);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container style={{height:isMobileView ? '100vh' : '80vh'}} fluid className='bg-primary d-flex flex-column justify-content-start'>
            {
        isMobileView ?
        <div style={{width:'100%',marginTop:30}}>
            <div style={{ marginBottom: 2, marginTop: 2, width: '100%' }}>
            <Form.Label style={{textAlign:'center',width:'100%',color:'#fff', fontWeight:'bold'}}>Seleccione un filtro</Form.Label>
            <Form.Select value={filtro} defaultValue={filtro} onChange={handleChange}>
              <option value={'nombre'}>Nombre</option>
              <option value={'dni'}>D.N.I.</option>
              <option value={'localidad'}>Localidad</option>
            </Form.Select>
          </div>
          <Form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <div className='bg-white' style={{borderRadius:5 , marginTop:2, width: '100%', display:'flex', flexDirection:'row' }}>
            {filtro === 'nombre' && (
                <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                    <Form.Control
                    type="text"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                    placeholder="Nombre del fiscal"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
                </div>
            )}

            {filtro === 'dni' && (
                <>
                    <Form.Control
                    type="text"
                    name="dni"
                    value={formik.values.dni}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.dni && !!formik.errors.dni}
                    placeholder="dni del fiscal"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.dni}</Form.Control.Feedback>
                </>
            )}

            {filtro === 'localidad' && (
              <>
                <Form.Control
                    type="text"
                    name="dni"
                    value={formik.values.dni}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.dni && !!formik.errors.dni}
                    placeholder="Localidad del fiscal"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.dni}</Form.Control.Feedback>
            </>
            )}
                <Button
                type="submit"
                variant="primary"
                size='sm'
                style={{ width: '10%',maxHeight:38, borderRadius: '0.5rem', display:'flex', alignItems:'center', justifyContent:'center' }}
                >
                   <img src={lupa} alt="Lupa" />
                </Button>
            </div>
          </Form>
        </div>
        :
        null
    }
    <Row className='mt-3' style={{ height: '75vh'}}>
      <Col className=' col-12 col-lg-8 col-xs-12 d-flex flex-column justify-content-start align-items-center' >
       
         {
            isMobileView ?
            <div style={{ backgroundColor:'#fff', width: '100%',minHeight:'380px', height:!isMobileView ? '80%': '80%',maxHeight:altura,overflowX:'auto'}}>
            <Table striped bordered hover responsive >
                <thead>
                    <tr className="">
                            <th>ID</th> 
                            <th className="border text-center px-4 py-2">NOMBRE</th>
                            
                    </tr>
                </thead>
                <tbody>
                  {
                    shownUsers.map((user:User,index) => {
                        return (
                            <tr key={index}>
                            <td className= {"border text-center"}>{user.id}</td>
                            <td className={"border text-center"} style={{ minWidth:150 }}>
                                <UserRow user={user}/>
                            </td>
                            
                            </tr>
                        )
                    })
                  }
                </tbody>
            </Table>
            </div>
            :
             <div style={{ backgroundColor:'#fff', width: '100%',minHeight:'380px', height:!isMobileView ? '50%': '80%',maxHeight:'300px',overflowX:'auto'}}>
            <Table striped bordered hover responsive style={{maxHeight:'250px'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre completo</th>
                    <th>Localidad</th>
                    <th>DNI</th>
                    <th>Opciones</th>
                </tr>
                </thead>
                <tbody>
                {shownUsers.map((row:User) => (
                    <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{`${row.nombre || ''} ${row.apellido || ''}`}</td>
                    <td>{row.localidad}</td>
                    <td>{row.dni}</td>
                    <td>
                        <div className="d-flex  justify-center rounded-lg text-lg ms-2" role="group">
                            {/*<!-- botón editar -->*/}
                            <a href="{{ route('producto.edit', $producto->id) }}"
                                className="btn btn-info">Editar</a>

                            {/*<!-- botón borrar -->*/}

                            <Button type="submit" className="btn btn-danger ms-2">Eliminar</Button>
                        </div>
                    </td>   
                    </tr>
                    
                ))}
                </tbody>
          </Table>
           </div>
         }
       
        <TablePagination rows={rows} cant={cant} setShownUsers={setShownUsers}/>
      </Col>

      <Col
                    className='col-12 col-lg-4 '
                    style={{height:'100%', display:isMobileView ? 'none' : 'flex', flexDirection:'column', justifyContent:'center'}}
                    >
                    <Row
                    style={{
                        marginBottom: '2px',
                        borderRadius: '3px',
                        height:'100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFF',
                    }}
                    >
                        <Col className='mt-5'>
                            <p style={{textAlign:'center', marginTop:10, fontSize: '20px', fontWeight: 'bold' }}>Panel de búsqueda</p>
                            <Col style={{marginBottom: '2px', marginTop: '2px', width: '100%' }}>
                                <Form.Label>Seleccione un filtro</Form.Label>
                                <Form.Select
                                value={formik.values.parametro}
                                onChange={handleChange}
                                style={{ width: '100%', backgroundColor: '#FFF' }}
                                >
                                <option value="nombre">Nombre</option>
                                <option value="dni">D.N.I.</option>
                                <option value="localidad">Localidad</option>
                                </Form.Select>
                            </Col>
                    
                            <Form style={{ width: '100%'}} onSubmit={formik.handleSubmit} id="myForm">
                                <Row>
                                    {filtro === 'nombre' && (
                                    <Col className='mt-4' style={{ marginBottom: '2px', width: '90%' }}>
                                        <Form.Group>
                                            <Form.Label>Nombre del fiscal</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="nombre"
                                            value={formik.values.nombre}
                                            onChange={formik.handleChange}
                                            isInvalid={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                            />
                                            <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    )}
                    
                                    {filtro === 'dni' && (
                                    <Col className='mt-4' style={{ marginBottom: '2px', marginTop: '2px', width: '90%' }}>
                                        <Form.Group>
                                            <Form.Label>D.N.I. del Fiscal</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="dni"
                                            value={formik.values.dni}
                                            onChange={formik.handleChange}
                                            isInvalid={formik.touched.dni && Boolean(formik.errors.dni)}
                                            />
                                            <Form.Control.Feedback type="invalid">{formik.errors.dni}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    )}
                    
                                {filtro === 'localidad' && (
                                    <Col className='mt-4' style={{ marginBottom: '2px', marginTop: 25, width: '90%' }}>
                                        <Form.Group>
                                            <Form.Label>Localidad del Fiscal</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="localidad"
                                            value={formik.values.localidad}
                                            onChange={formik.handleChange}
                                            isInvalid={formik.touched.localidad && Boolean(formik.errors.localidad)}
                                            />
                                            <Form.Control.Feedback type="invalid">{formik.errors.localidad}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                )}
                    
                                    <Button
                                        type="submit"
                                        className='bg-primary mt-3 text-white'
                                        variant="contained"
                                        style={{width:'90%',marginTop:25,display:'block',marginLeft:'auto', marginRight:'auto'}}
                                    >
                                        Buscar
                                    </Button>
                                </Row>
                            </Form>
                        
                        </Col>
                    </Row>
                </Col>
      </Row>
    </Container>
  );
};
