import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Button, Modal, NativeSelect, TextInput } from "@mantine/core";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function EditStudentForm({ data, onClose, opened, reqRefresh }) {
  const [formValue, setFormValue] = useState({
    User: {
      fullname: data.User.fullname,
      email: data.User.email,
      // id: data.userId,
      role: "student",
    },
    student: {
      curr_sem: data.curr_sem,
      curryear: data.curryear,
      examseatno: data.examseatno,
      prn: data.prn,
      rollno: data.rollno,
    },
  });
  const [dataSem, setDataSem] = useState(["3", "4", "5", "6", "7", "8"]);
  const [dataYear, setDataYear] = useState(["2", "3", "4"]);
 /**
  * If the year is 2, then set the semesters to 3 and 4. If the year is 3, then set the semesters to 5
  * and 6. If the year is 4, then set the semesters to 7 and 8.
  */
  const handleYearSem = (year) => {
    if (year === "2") {
      setDataSem(["3", "4"]);
    } else if (year === "3") {
      setDataSem(["5", "6"]);
    } else if (year === "4") {
      setDataSem(["7", "8"]);
    }
  };
/**
 * If the value of the sem variable is 3 or 4, set the value of the dataYear variable to 2.
 * 
 * If the value of the sem variable is 5 or 6, set the value of the dataYear variable to 3.
 * 
 * If the value of the sem variable is 7 or 8, set the value of the dataYear variable to 4.
 * 
 * If the value of the sem variable is anything else, do nothing.
 */
  const handleSemYear = (sem) => {
    if (sem === "3" || sem === "4") {
      setDataYear(["2"]);
    }
    if (sem === "5" || sem === "6") {
      setDataYear(["3"]);
    }
    if (sem === "7" || sem === "8") {
      setDataYear(["4"]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
    axios
      .put(
        `http://localhost:5000/users/${data.userId}`,
        { user: formValue.User },
        { withCredentials: true }
      )
      .then((res) => {
        axios
          .put(
            `http://localhost:5000/student/${data.userId}`,
            { student: formValue.student },
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
            reqRefresh("students");
            onClose(undefined);
          })
          .catch((res) => {
            showNotification({
              title: "Failed",
              message: res.response.data.err,
              icon: <IconX />,
              color: "red",
              autoClose: false,
              radius: "xl",
            });
          });
      })
      .catch((res) => {
        showNotification({
          title: "Failed",
          message: res.response.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: false,
          radius: "xl",
        });
      });
  };
  return (
    <Modal
      opened={opened}
      onClose={() => onClose(undefined)}
      title={"Edit Student Account"}
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          withAsterisk
          required
          value={formValue.User.fullname}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              User: { ...formValue.User, fullname: e.target.value },
            });
          }}
        ></TextInput>
        <TextInput
          label="Email"
          withAsterisk
          required
          type={"email"}
          value={formValue.User.email}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              User: { ...formValue.User, email: e.target.value },
            });
          }}
        ></TextInput>
        <TextInput
          label="Roll Number"
          withAsterisk
          required
          type={"number"}
          value={formValue.student.rollno}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              student: { ...formValue.student, rollno: e.target.value },
            });
          }}
        ></TextInput>
        <TextInput
          label="Exam seat Number"
          value={formValue.student.examseatno}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              student: { ...formValue.student, examseatno: e.target.value },
            });
          }}
        ></TextInput>
        <TextInput
          label="Permanent Registration Number"
          value={formValue.student.prn}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              student: { ...formValue.student, prn: e.target.value },
            });
          }}
        ></TextInput>
        <NativeSelect
          data={dataSem}
          label="Semester"
          value={formValue.student.curr_sem}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              student: { ...formValue.student, curr_sem: e.target.value },
            });
            handleSemYear(e.target.value);
          }}
        />
        <NativeSelect
          data={dataYear}
          label="Year"
          value={formValue.student.curryear}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              student: { ...formValue.student, curryear: e.target.value },
            });
            handleYearSem(e.target.value);
          }}
        />
        <Button type="submit" radius="md" mt={12} leftIcon={<IconCheck />}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}
