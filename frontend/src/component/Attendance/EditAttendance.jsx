import React from "react";
import { Badge, NativeSelect, Table } from "@mantine/core";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function EditAttendance({ data, reqRefresh }) {
  console.log(data);
  const updatePresentee = (obj) => {
    obj.presentee = obj.presentee == "Present" ? true : false;
    axios
      .put(
        "http://localhost:5000/attend",
        { ...obj },
        { withCredentials: true }
      )
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Information Updated Successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
        reqRefresh("edit");
      })
      .catch((res) => {
        console.log(res);
        showNotification({
          title: "Failed",
          message: res.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
      });
  };

  const rows = data.map((element) => (
    <tr key={element.StudentUserId}>
      <td>{element.Student.User.fullname}</td>
      <td>{element.Student.rollno}</td>
      <td>
        <NativeSelect
          data={["Present", "Absent"]}
          value={element.presentee ? "Present" : "Absent"}
          onChange={(e) => {
            updatePresentee({
              StudentUserId: element.StudentUserId,
              createdAt: element.createdAt,
              SubjectSubCode: element.SubjectSubCode,
              presentee: e.target.value,
            });
          }}
          variant="unstyled"
        ></NativeSelect>
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Roll Number</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
