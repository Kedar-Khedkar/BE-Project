import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  TextInput,
  NativeSelect,
  Button,
} from "@mantine/core";
import axios from "axios";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { closeAllModals, openModal } from "@mantine/modals";
import { useForm } from "@mantine/form";

export default function FacultyManagementTable({ data }) {
  console.log(data);
  const theme = useMantineTheme();
  const form = useForm({});
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`, null, {
        withCredentials: true,
      })
      .then((res) => {
        showNotification({
          title: "Success",
          message: "User Deleted successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
      })
      .catch((res) => {
        showNotification({
          title: "Failed",
          message: res.response.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
      });
  };
  const updateUser = (event) => {
    event.preventDefault();
    console.log(form.values);
  };
  const editUser = async (obj) => {
    form.setValues(obj.User);
    openModal({
      title: "Edit Faculty",
      centered: true,
      overlayOpacity: 0.15,
      overlayBlur: 3,
      children: (
        <>
          <form onSubmit={updateUser}>
            <TextInput
              // defaultValue={obj.userId}
              display="none"
              name="userId"
            ></TextInput>
            <TextInput
              label="Name"
              withAsterisk
              name="fullname"
              // defaultValue={obj.User.fullname}
              {...form.getInputProps("fullname")}
            ></TextInput>
            <NativeSelect
              data={["admin", "faculty", "student"]}
              label="Role"
              name="role"
              withAsterisk
              {...form.getInputProps("role")}
            />
            <TextInput
              label="Email"
              withAsterisk
              name="email"
              // defaultValue={obj.User.email}
              {...form.getInputProps("email")}
            ></TextInput>
            <Button type="submit" mt={12} leftIcon={<IconCheck />}>
              Submit
            </Button>
            <Button
              type="close"
              mt={12}
              ml={8}
              color={"gray"}
              leftIcon={<IconX />}
              onClick={closeAllModals}
            >
              Cancel
            </Button>
          </form>
        </>
      ),
    });
  };
  const rows = data.map((item) => (
    // const rows = (
    <tr key={item.userId}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text size="sm" weight={500}>
            {item.User.fullname}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
          color={item.User.role === "admin" ? "pink" : "cyan"}
        >
          {item.User.role}
        </Badge>
      </td>
      <td>
        <Anchor size="sm" href="#" onClick={(event) => event.preventDefault()}>
          {item.User.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item.Subject.subName}
        </Text>
      </td>
      <td>
        <Group>
          <ActionIcon
            onClick={async () => {
              form.setValues(item.User);
              editUser(item);
            }}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              deleteUser(item.userId);
            }}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        // striped
        highlightOnHover
      >
        <thead>
          <tr>
            <th>Faculty</th>
            <th>Role</th>
            <th>Email</th>
            <th>Subjects taught</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
