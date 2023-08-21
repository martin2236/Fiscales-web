import {useState,useEffect} from 'react'
import Pagination from 'react-bootstrap/Pagination';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';

export const TablePagination = ({rows,cant,setCant,pedirUsuarios,setShownUsers}:any) => {
    
  
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * cant;
    const indexOfFirstRow = indexOfLastRow - cant;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(rows.length / cant);


    useEffect(()=>{
        setShownUsers(currentRows)
    },[currentPage])

    useEffect(() => {
        pedirUsuarios();
    },[cant]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    
  return (
    <Row className='d-flex flex-row' style={{width:'100%',backgroundColor:'#fff',marginTop:4, height:42, paddingTop:2, display:'flex',flexDirection:'row',}}>
          <Col>
            <Pagination className='ms-1'>
                <Pagination.Prev disabled={currentPage === 1} onClick={handlePrevPage} />
                {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                </Pagination.Item>
                ))}
                <Pagination.Next disabled={currentPage === totalPages} onClick={handleNextPage} />
            </Pagination>
          </Col>
          <Col style={{maxWidth:'90px' }}>
                <Form.Select  defaultValue={cant} onChange={(e) => setCant(e.target.value)}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                </Form.Select>
            </Col>
        </Row>
    
  )
}
