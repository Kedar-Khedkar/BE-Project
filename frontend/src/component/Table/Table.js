import { Table,Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./Table.css";
import React from "react";
import { Container } from "react-bootstrap";
import errors from "./List";

export function tableGen(props) {
  return (
    <>
      <Container>
        <Table>
          <Thead>
            <Tr>
              <Th>email</Th>
              <Th>fullName</Th>
              <Th>errorMsg</Th>
              
            </Tr>
            <Tbody>
              <Tr>
                <Td>
                  {props.email}
                </Td>
                <Td>
                  {props.fullName}
                </Td>
                <Td>
                  {props.errorMsg}
                </Td>
              </Tr>
            </Tbody>
          </Thead>
        </Table>
      </Container>
    </>
  );
}

// export default Table;

export default function showList(){
    return(
      <>
        <div className="mainList">
          {errors.map((e)=>{
            return(
              <tableGen email={e.email} fullName={e.fullName} errorMsg={e.errorMsg}/>
            )
          })}
        </div>
      </>
    )
}



