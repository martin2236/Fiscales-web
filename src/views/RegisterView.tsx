import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { baseIp } from '../config/conection';
import { User } from './HomeView';
import { Row,Col,Container } from 'react-bootstrap';

interface Props {
  user: User;
}

interface formData {
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  localidad: string;
  direccion: string;
  escuela: string;
  mesa: number;
}

let validationSchema = yup.object({
  nombre: yup.string().required('Ingrese un nombre'),
  apellido: yup.string().required('Ingrese un apellido'),
  dni: yup.string().required('Ingrese un dni'),
  direccion: yup.string().required('Ingrese una direccion'),
  email: yup.string().required('Ingrese un email').email('Verifique el formato de su email'),
  localidad: yup.string().required('Ingrese una localidad'),
  escuela: yup.string().required('Ingrese una escuela'),
  mesa: yup.number().required('Ingrese un numero de mesa'),
});

export const RegisterView = ({ user }: Props) => {
  const initialValues = {
    nombre: '',
    apellido: '',
    direccion: '',
    dni: '',
    email: '',
    localidad: '',
    escuela: '',
    mesa: 0,
  };
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

  const onSubmit = (values: formData, { resetForm }: any) => {
    fetch(`${baseIp}/fiscales/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${user.session_token}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));

    resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container style={{height:'80vh'}} fluid className='bg-primary'>
      <Row
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height:'100%'
        }}
      >
        <Col className='mt-1 col-lg-6 col-md-8 col-xs-11' style={{overflowX:'auto', maxHeight:isMobileView ? '700px' : '450px',  backgroundColor: '#FFF' }}>
          <h4 style={{textAlign:'center',marginTop:20, fontSize: '20px', fontWeight: 'bold', marginBottom: '1rem' }}>Formulario de registro</h4>

          <Form style={{width: '100%', display: 'flex',flexDirection:'column', justifyContent:'center', alignItems:'center' }} onSubmit={formik.handleSubmit}>
            {/* parte izquierda */}
            
            <Container >
                <Row className='d-flex flex-wrap justify-content-center'>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="nombre" style={{ marginBottom: 5, marginTop: 5}}>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                            type="text"
                            name="nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="apellido" style={{ marginBottom: 5, marginTop: 5,  }}>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                            type="text"
                            name="apellido"
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.apellido && !!formik.errors.apellido}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.apellido}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="dni" style={{ marginBottom: 5, marginTop: 5}}>
                            <Form.Label>D.N.I</Form.Label>
                            <Form.Control
                            type="text"
                            name="dni"
                            value={formik.values.dni}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.dni && !!formik.errors.dni}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.dni}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="email" style={{ marginBottom: 5, marginTop: 5 }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='d-flex flex-wrap justify-content-center'>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="localidad" style={{ marginBottom: 5, marginTop: 5 }}>
                                <Form.Label>Localidad</Form.Label>
                                <Form.Control
                                type="text"
                                name="localidad"
                                value={formik.values.localidad}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.localidad && !!formik.errors.localidad}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.localidad}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="direccion" style={{ marginBottom: 5, marginTop: 5 }}>
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control
                            type="text"
                            name="direccion"
                            value={formik.values.direccion}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.direccion && !!formik.errors.direccion}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.direccion}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="escuela" style={{ marginBottom: 5, marginTop: 5}}>
                                <Form.Label>Escuela</Form.Label>
                                <Form.Control
                                type="text"
                                name="escuela"
                                value={formik.values.escuela}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.escuela && !!formik.errors.escuela}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.escuela}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className='col-12 col-md-5 col-lg-5'>
                        <Form.Group controlId="mesa" style={{ marginBottom: 5, marginTop: 5 }}>
                            <Form.Label>Mesa</Form.Label>
                            <Form.Control
                            type="number"
                            name="mesa"
                            value={formik.values.mesa}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.mesa && !!formik.errors.mesa}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.mesa}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
              

            </Container>
                <Row  style={{width:"100%"}}>
                    <Col className='col-xs-12'>
                        <Button type="submit" className='mb-1' variant="primary" style={{ width:'100%' ,display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: isMobileView ? '2rem':'1rem', borderRadius: '0.5rem' }}>
                         Añadir Fiscal
                        </Button>
                    </Col>
                </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
