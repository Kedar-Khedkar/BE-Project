import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Button, Modal, NativeSelect, TextInput } from "@mantine/core";
import axios from "axios";
export default function EditFacultyForm({ data, onClose, opened }) {
  const [formValue, setFormValue] = useState({
    fullname: data.fullname,
    email: data.email,
    role: data.role,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/users/${data.id}`,
        { user: formValue },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };
  return (
    <Modal opened={opened} onClose={() => onClose(undefined)}>
      <form action="" onSubmit={handleSubmit}>
        <TextInput
          label={"Fullname"}
          required
          onChange={(e) => {
            setFormValue({ ...formValue, fullname: e.target.value });
          }}
          value={formValue.fullname}
        />
        <TextInput
          
          label={"email"}
          required
          onChange={(e) => {
            setFormValue({ ...formValue, email: e.target.value });
          }}
          value={formValue.email}
        />
        <NativeSelect
          label={"Role"}
          required
          data={["admin", "faculty"]}
          value={formValue.role}
          onChange={(e) => {
            setFormValue({ ...formValue, role: e.target.value });
          }}
        />
        <Button type="submit" radius="md" mt={12}>
          Update
        </Button>
      </form>
    </Modal>
  );
}
