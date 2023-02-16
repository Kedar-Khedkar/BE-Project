import {
  Space,
  Container,
  SimpleGrid,
  TextInput,
  NumberInput,
  Button
} from "@mantine/core";
import { IconUserPlus, IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

export function StudentForm() {
  const form = useForm({
    initialValues: {
      user: {
        email: "",
        fullname: "",
        phone: 0,
        parentsphone: 0,
        rollnumber: 0,
        batch: "",
        prnnumber: "",
        role: "student",
      },
    },

    // functions will be used to validate values at corresponding key
    validate: {
      user: {
        phone: (value) => String(value).length === 10 ? null : "Invalid phone number",
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        fullname: (value) => typeof value === "string" ? null : "Invalid name",
      },
    },
  });
  const handleSubmitStudent = (event, values) => {
    console.log(form.values);
    axios
      .post("http://localhost:5000/users/studentRegister", form.values)
      .then(function (response) {
        if (response.data.status === "success") {
          showNotification({
            title: "Success",
            message: "User added successfully",
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
        console.log(response.data);
      });
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmitStudent)}>
        <Container>
          <Space h="xs" />
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            <div>
              <TextInput
                placeholder="Your name"
                label="Name"
                withAsterisk
                {...form.getInputProps("user.fullname")} />
            </div>
            <div>
              <TextInput
                placeholder="dev@mmcoe.edu.in"
                label="Email"
                {...form.getInputProps("user.email")} />
            </div>
            <div>
              <NumberInput
                placeholder="0000000000"
                label="Phone"
                hideControls
                {...form.getInputProps("user.phone")} />
            </div>
            <div>
              <NumberInput
                placeholder="0000000000"
                label="Parents Phone number"
                hideControls
                {...form.getInputProps("user.parentsphone")} />
            </div>
            <div>
              <TextInput
                placeholder="batch"
                label="Batch"
                {...form.getInputProps("user.batch")} />
            </div>
            <div>
              <NumberInput
                placeholder=""
                label="Roll number"
                hideControls
                {...form.getInputProps("user.rollnumber")} />
            </div>
            <div>
              <TextInput
                placeholder="prn "
                label="PRN number"
                {...form.getInputProps("user.prnnumber")} />
            </div>
          </SimpleGrid>
          <Space h="md" />
          <Container size={500} px={0}>
            <Button
              fullWidth
            
              type="submit"
              leftIcon={<IconUserPlus />}
            >
              Add User
            </Button>
          </Container>
        </Container>
      </form>
    </>
  );
}
