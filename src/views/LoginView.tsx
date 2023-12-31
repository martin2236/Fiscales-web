import { useContext, useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import mainImage from '../assets/mainImage.jpg';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { baseIp } from '../config/conection';
import { FiscalContext } from '../context/FiscalContext';

interface FormData {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().required('Ingrese su usuario'),
  password: yup.string().required('Ingrese una contraseña'),
});

export const LoginView = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const initialValues: FormData = {
    email: '',
    password: '',
  };

  const {user,login} = useContext(FiscalContext);

  useEffect(()=>{
    user && navigate('home')
  },[user])

  const onSubmit = async(values: FormData, { resetForm }: any) => {
    setCargando(true);
     await login(values.email,values.password)
    if(user){
      setCargando(false);
    }
    resetForm();
  };

  return (
    <Container fluid className="bg-primary" style={{ maxWidth: '100%', height: '100vh' }}>
      <Row style={{height:'100vh'}}>
        <Col style={{height:'50%'}} className="col-lg-8 d-flex flex-column align-center justify-center">
          <p className="mt-4 text-white fw-bold fs-2" style={{ textAlign: 'center' }}>
            Sistema de gestión de FISCALES
          </p>
          <img src={mainImage} alt="Main" />
        </Col>
        <Col  className="col-lg-4 bg-white d-flex flex-column align-items-center justify-content-center">
          {!cargando ? (
            <>
              <p className="fw-bold  fs-3 mt-5">Iniciar Sesión</p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={true}
              >
                 {(formik) => (
                   <Form style={{ width: '80%' }}  onSubmit={formik.handleSubmit}>
                   <Form.Group className="mb-3" controlId="email">
                     <Form.Label>Usuario</Form.Label>
                     <Field
                       type="text"
                       name="email"
                       className="form-control"
                     />
                     <ErrorMessage
                       name="email"
                       component="div"
                       className="text-danger"
                     />
                   </Form.Group>
                   <Form.Group className="mb-3" controlId="password">
                     <Form.Label>Contraseña</Form.Label>
                     <Field
                       type="password"
                       name="password"
                       className="form-control"
                     />
                     <ErrorMessage
                       name="password"
                       component="div"
                       className="text-danger"
                     />
                   </Form.Group>
                   <Button type="submit" className='mt-3 ' style={{width:'100%'}} variant="primary">
                     Iniciar Sesión
                   </Button>
                 </Form>
                )}
              </Formik>
            </>
          ) : (
            <div>
              <p>Iniciando Sesión</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
