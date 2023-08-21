import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Check from '../assets/icons/check.png'
import Close from '../assets/icons/close.png'

interface Alerta {
    show:boolean,
    variant:string,
    msg:string,
}
interface Props{
   alerta:Alerta
}

export const CustomAlert = ({alerta}:Props) => {
    const {show,variant,msg} = alerta;
    return (
        <Row className='d-flex justify-content-center mt-1' >
            <Alert  show={show} closeVariant='white' className='position-absolute' style={{maxWidth:350}} variant={variant}>
                <Alert.Heading className='d-flex flex-row justify-content-around align-items-center'>
                    <img style={{height:25,width:25, marginBottom:15}} src={variant == 'success' ? Check : Close} alt='Icono'/>
                    <p style={{textAlign:'center'}}>{msg}</p>
                </Alert.Heading>
            </Alert>
        </Row>
      );
}
