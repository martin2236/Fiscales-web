import {useState,useEffect} from 'react'
import Pagination from 'react-bootstrap/Pagination';

export const TablePagination = ({rows,cant,setShownUsers}:any) => {
    
    const rowsPerPage = cant;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    useEffect(()=>{
        setShownUsers(currentRows)
    },[currentPage])

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    
  return (
    <div style={{width:'100%',backgroundColor:'#fff',marginTop:4, height:42, paddingTop:2, display:'flex',flexDirection:'row',}}>
          <Pagination className='ms-1'>
            <Pagination.Prev disabled={currentPage === 1} onClick={handlePrevPage} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={handleNextPage} />
          </Pagination>
        </div>
    
  )
}
