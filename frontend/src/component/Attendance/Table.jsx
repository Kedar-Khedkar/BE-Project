import React, { useState, useEffect } from "react";
import axios from "axios";
import {Table,Container} from "react-bootstrap";
export default function TableAttendance(props) {
  const [attendList, setattendList] = useState([]);

  useEffect(() => {
    setattendList(props.data);
  }, []);
  console.log(attendList);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = attendList.map((user) => {
        return { ...user, presentee: checked };
      });
      setattendList(tempUser);
    } else {
      let tempUser = attendList.map((user) =>
        user.name === name ? { ...user, presentee: checked } : user
      );
      setattendList(tempUser);
      console.log(tempUser);
    }
  };
  const handleClick = () => {
    axios.post("http://localhost:5000/attend/multiple",attendList)
    .then((response)=>{console.log(response)});
    setattendList([]);
  };
  return (
    <>
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><input
            type="checkbox"
            className="form-check-input"
            name="allSelect"
            // checked={
            //   attendList.filter((user) => user?.presentee !== true).length < 1
            // }
            checked={!attendList.some((user) => user?.presentee !== true)}
            onChange={handleChange}
          /></th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Subject Code</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {attendList.map((user,i) => {
              return(
            <tr key = {i}>
           
                <td><input
                type="checkbox"
                className="form-check-input"
                name={user.name}
                checked={user?.presentee || false}
                onChange={handleChange}
              /></td>
            
              <td>{user.name}</td>
              <td>{user.rollno}</td>
              <td>{user.SubjectSubCode}</td>
              <td>{user.date}</td>
            </tr>
              )
        
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
