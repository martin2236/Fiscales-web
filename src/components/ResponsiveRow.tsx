import { Accordion } from 'react-bootstrap';

export const UserRow = (user:any) => {
    const {id, nombre,apellido, email, localidad, escuela, mesa} = user.user
    return(
    <Accordion style={{minWidth:'300px'}}>
      <Accordion.Item eventKey={id}>
        <Accordion.Header>{nombre} {apellido}</Accordion.Header>
        <Accordion.Body>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                <p style={{fontWeight:'bold'}}>Email :</p>
                <p style={{marginLeft:15}}>{email}</p>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                <p style={{fontWeight:'bold'}}>Localidad :</p>
                <p style={{marginLeft:15}}>{localidad}</p>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                <p style={{fontWeight:'bold'}}>Escuela :</p>
                <p style={{marginLeft:15}}>{escuela}</p>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                <p style={{fontWeight:'bold'}}>Mesa :</p>
                <p style={{marginLeft:15}}>{mesa}</p>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                <p style={{fontWeight:'bold'}}>Opciones :</p>
                <div className="d-flex  justify-center rounded-lg text-lg ms-2" role="group">
                    {/*<!-- botón editar -->*/}
                    <a href="{{ route('producto.edit', $producto->id) }}"
                        className="btn btn-success">Editar</a>

                    {/*<!-- botón borrar -->*/}

                        <button type="submit" className="btn btn-danger ms-2">Eliminar</button>
                </div>
            </div>   
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    )
}