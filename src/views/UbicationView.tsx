import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Container,Row,Col , Button, Form } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import { baseIp } from '../config/conection';
import { User } from './HomeView';
import lupa from '../assets/icons/lupa.png'

interface formData {
    nombre:string,
    dni:string,
    localidad:string
}

interface Props{
    user:User,
    coords:{lat:number,lon:number}
}

export interface Fiscal {
    id:          number;
    nombre:      string;
    email:       string;
    apellido:    string;
    dni:         string;
    direccion:   string;
    password:    string;
    localidad:   string;
    escuela:     string;
    mesa:        number;
    rolId:       number;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
    fiscalId:    null;
    coordenadas: Coordenada[];
}

export interface Coordenada {
    id:        number;
    latitud:   number;
    longitud:  number;
    createdAt: Date;
}

 let validationSchema:null | {} ; 

export const UbicationView = ({user,coords}:Props) => {

    const [filtro,setFiltro] = useState('nombre');
    const [listaCoordenadas, setListaCoordenadas] = useState([]);
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

    useEffect(() => {
        if(user.session_token != ""){
            fetch(`${baseIp}/coordenadas/`,{
                method:'GET',
                headers: {
                  "Content-Type": "application/json",
                  'Authorization':`${user.session_token}`,
                }
              })
              .then(res => res.json())
              .then((data) => {setListaCoordenadas(data.data)})
              .catch(error => console.log(error))
        }else{
            console.log('no hay token')
        }
        
    },[]);

    const initialValues = {
        nombre:'',
        dni: '',
        localidad: '',
        parametro:''
      };
      const onSubmit = (values:formData,{ resetForm }:any) => {
        console.log(values)
        const buscar:any = {};
        const{nombre,dni,localidad} = values;
        if(nombre != ''){
            buscar.filtro = 'nombre';
            buscar.valor = nombre.replace(' ','%20');
        }else if (dni != ''){
            buscar.filtro = 'dni';
            buscar.valor = dni;
        }else if (localidad != ''){
            buscar.filtro = 'localidad';
            buscar.valor = localidad;
        }
        fetch(`${baseIp}/fiscales/${buscar.filtro}/${buscar.valor}`,{
            method:'GET',
            headers: {
              "Content-Type": "application/json",
              'Authorization':`${user.session_token}`,
            }
          })
          .then(res => res.json())
          .then((data) => {
            if(data.success){
                console.log('data de ubicacion',data)
                setListaCoordenadas(data.data)
            }
          })
          .catch(error => console.log(error))
        resetForm()
      }

      switch (filtro) {
        case 'nombre': 
            validationSchema = yup.object({
                nombre: yup.string().required('Ingrese un nombre')
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
        

      const handleChange = (event: any) =>{
        setFiltro(event.target.value)
      }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
      });

    return (
        <Container style={{height:isMobileView ? '100vh' : '80vh'}} fluid className='bg-primary d-flex flex-column justify-content-center'>
            {
        isMobileView ?
        <div style={{width:'100%',marginTop:5,marginBottom:15}}>
            <div style={{ marginBottom: 2, marginTop: 2, width: '100%' }}>
            <Form.Label style={{textAlign:'center',width:'100%',color:'#fff', fontWeight:'bold'}}>Seleccione un filtro</Form.Label>
            <Form.Select defaultValue={filtro} onChange={handleChange}>
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
          {/* Map Container */}
            <Row style={{ height: '75vh'}}>
                <Col className='col-12 col-lg-8'>
                {
            coords.lat != 0 ? 
            <MapContainer center={[coords.lat, coords.lon]} zoom={13} style={{ height: '75vh' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    listaCoordenadas.map( (item:Fiscal) => {
                        if(item.coordenadas.length){
                            let algo = item.coordenadas.length + 1
                            let ultimoValor = item.coordenadas.pop();
                            let fechaString = JSON.stringify(ultimoValor!.createdAt);
                            let partes = fechaString.split("T");
                            let horaString = partes[1].split(".")[0];
                            return(
                                <Marker key={item.id} position={[ultimoValor!.latitud, ultimoValor!.longitud]}>
                                    <Popup>
                                        fiscal:{item.nombre} {item.apellido}<br/>
                                        cantidad de registros: {algo}<br/>
                                        ultimo registro: {horaString}
                                    </Popup>
                                </Marker>
                            )
                        }
                    })
                }
            </MapContainer>
            :
            <Col>
                <p style={{fontSize:20, fontWeight:'bold'}}>
                    Buscando coordenadas
                </p>
            </Col>
        }
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
