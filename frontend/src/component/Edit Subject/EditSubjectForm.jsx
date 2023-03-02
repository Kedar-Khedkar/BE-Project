import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Button, Modal, NativeSelect, TextInput } from "@mantine/core";
import axios from "axios";
export default function EditSubjectForm({ data, onClose, opened }) {
  console.log(data);
  const [formValue, setFormValue] = useState({
    subCode: data.subCode,
    subName: data.subName,
    pract: data.pract,
    oral: data.oral,
    termWork: data.termWork,
    sem: data.sem,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/subjects/${data.id}`,
        { subject: formValue },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      });


  };
  return (
    <Modal opened={opened} onClose={() => onClose(undefined)}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="SubjectCode"
          placeholder="Subject Code"
          type={Number}
          required
          value={formValue.subCode}
          onChange={(e) => {
            setFormValue({ ...formValue, subCode: e.target.value });
          }}
          withAsterisk
        />
        <TextInput
          label="Subject Name"
          placeholder="Subject name"
          mt="md"
          withAsterisk
          required
          value={formValue.subName}
          onChange={(e) => {
            setFormValue({ ...formValue, subName: e.target.value });
          }}
        />
        <TextInput
          type="number"
          label="Practical"
          placeholder="Practical"
          mt="md"
          withAsterisk
          required
          min={0}
          max={100}
          value={formValue.pract}
          onChange={(e) => {
            setFormValue({ ...formValue, pract: e.target.value });
          }}
        />
        <TextInput
          type="number"
          label="Oral"
          placeholder="Oral"
          mt="md"
          withAsterisk
          required
          min={0}
          max={50}
          value={formValue.oral}
          onChange={(e) => {
            setFormValue({ ...formValue, oral: e.target.value });
          }}
        />
        {/* <TextInput
          type="number"
          label="Sem"
          placeholder="Sem"
          mt="md"
          {...form.getInputProps('sem')}
        /> */}
        <NativeSelect
          mt="md"
          data={["2", "3", "4", "5", "6", "7", "8"]}
          label="Semester"
          value={formValue.sem}
          required
          onChange={(e) => {
            setFormValue({ ...formValue, sem: e.target.value });
          }}
          withAsterisk
        />

        <TextInput
          type="number"
          label="Termwork"
          placeholder="Termwork"
          mt="md"
          withAsterisk
          required
          min={0}
          max={50}
          value={formValue.termWork}
          onChange={(e) => {
            setFormValue({ ...formValue, termWork: e.target.value });
          }}
        />
        <Button
          onClick={() => {
            console.log();
          }}
          type="submit"
          mt="md"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
}
