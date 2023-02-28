import { useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Button, Box, Code } from '@mantine/core';
import axios from 'axios';
import { IconUserPlus, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function CreateSubject() {
  
const form = useForm({
    initialValues: {
      subCode: '',
      subName: '',
      termwork: '50',
      pract: '0',
      oral:'0',
      sem:''
    },
    validate:{
      subCode: isNotEmpty('Subject code cannot be empty'),
      subName: isNotEmpty('Subject name cannot be empty'),
      sem: isNotEmpty('Select semester')
    }
  });
  
  const handleSubmitSubject = (evevt, values) => {
    console.log(form.values);
    axios.post("http://localhost:5000/subjects/create",{subject: form.values},{withCredentials:true})
    .then(function (response) {
        if (response.data.status === "success") {
          showNotification({
            title: "Success",
            message: "Subject created successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 2000,
            radius: "xl",
          });
        } else {
          showNotification({
            title: "Fail",
            message: response.data.err,
            icon: <IconX />,
            color: "red",
            autoClose: 2000,
            radius: "xl",
          });
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form
        onSubmit={form.onSubmit(handleSubmitSubject)}
      >
        <TextInput
          type="number"
          label="SubjectCode"
          placeholder="Subject Code"
          {...form.getInputProps('subCode')}
        />
        <TextInput
          label="Subject Name"
          placeholder="Subject name"
          mt="md"
          {...form.getInputProps('subName')}
        />
        <TextInput
          type="number"
          label="Practical"
          placeholder="Practical"
          mt="md"
          {...form.getInputProps('pract')}
        />
        <TextInput
          type="number"
          label="Oral"
          placeholder="Oral"
          mt="md"
          {...form.getInputProps('oral')}
        />
        <TextInput
          type="number"
          label="Sem"
          placeholder="Sem"
          mt="md"
          {...form.getInputProps('sem')}
        />
        <TextInput
          type="number"
          label="Termwork"
          placeholder="Termwork"
          mt="md"
          {...form.getInputProps('termwork')}
        />
        <Button onClick={()=> {console.log()}} type="submit" mt="md">
          Submit
        </Button>
      </form>
    </Box>
  );
}