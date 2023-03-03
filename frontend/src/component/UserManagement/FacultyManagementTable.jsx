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
  Paper,
} from "@mantine/core";
import axios from "axios";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { closeAllModals, openModal } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { useState } from "react";
import EditFacultyForm from "./EditFacultyForm";

export default function FacultyManagementTable({ data, reqRefresh }) {
  console.log(data);
  const theme = useMantineTheme();
  const [formdata, setFormData] = useState();
  const refresh = () => {
    reqRefresh("faculty");
  };
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
        reqRefresh("faculty");
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
  const rows = data.map((item) => (
    // const rows = (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text size="sm" weight={500}>
            {item.fullname}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
          color={item.role === "admin" ? "pink" : "cyan"}
        >
          {item.role}
        </Badge>
      </td>
      <td>
        <Anchor
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
          underline={false}
        >
          {item.email}
        </Anchor>
      </td>
      <td>
        <Group>
          <ActionIcon
            onClick={async () => {
              setFormData(item);
              console.log(formdata);
            }}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              deleteUser(item.id);
            }}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Paper shadow="md" p="md">
      <ScrollArea>
        {formdata && (
          <EditFacultyForm
            opened={formdata !== undefined}
            data={formdata}
            onClose={setFormData}
            reqRefresh={refresh}
          />
        )}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
