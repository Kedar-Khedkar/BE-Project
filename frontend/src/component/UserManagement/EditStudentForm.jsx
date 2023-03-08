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
      role : "student"
    },
    student: {
      curr_sem: data.curr_sem,
      curryear: data.curryear,
      examseatno: data.examseatno,
      prn: data.prn,
      rollno: data.rollno,
    },
  });
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
          data={["3", "4", "5", "6", "7", "8"]}
          label="Semester"
          value={formValue.student.curr_sem}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              student: { ...formValue.student, curr_sem: e.target.value },
            });
          }}
        />
        <NativeSelect
          data={["2", "3", "4"]}
          label="Year"
          value={formValue.student.curryear}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              student: { ...formValue.student, curryear: e.target.value },
            });
          }}
        />
        <TextInput
          label="Parents Mobile Number"
          // value={formValue.student.prn}
          // onChange={(e) => {
          //   setFormValue({
          //     ...formValue,
          //     student: { ...formValue.student, prn: e.target.value },
          //   });
          // }}
        ></TextInput>
        <TextInput 
        label="Parents Email"
        ></TextInput>
        
        <Button type="submit" radius="md" mt={12} leftIcon={<IconCheck />}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}
