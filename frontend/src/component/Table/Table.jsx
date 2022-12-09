import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./Table.css";
import React from "react";
import { Container } from "react-bootstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import errors from "./List";
export default function TableGen(props) {
  return (
    <>
      <Container>
      <Table className='responsive-table'>
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Full Name</Th>
            <Th>Role</Th>
            <Th>Errors</Th>
          </Tr>
        </Thead>

        <Tbody className={'responsive-table-body'}>
          {props.errors.map((e,i) => {
            console.log(e.email);
            return (
              <>
                <Tr key={i}>
                  <Td>{e.email}</Td>
                  <Td>{e.fullname}</Td>
                  <Td>{e.role}</Td>
                  <Td>{e.errmsg}</Td>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
      </Container>
    </>
  );
}

// export default Table;

// export default function ShowList(){
//     return(
//       <>
//         <div className="mainList">
//           {errors.map((e,i)=>{
//             return(
//               <TableGen key={i} email={e.email} fullName={e.fullName} errorMsg={e.errorMsg}/>
//             )
//           })}
//         </div>
//       </>
//     )
// }
