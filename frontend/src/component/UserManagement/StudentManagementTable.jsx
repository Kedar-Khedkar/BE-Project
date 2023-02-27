import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function StudentManagementTable({ data }) {
  const theme = useMantineTheme();

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
          color="yellow"
        >
          Student
        </Badge>
      </td>
      <td>
        <Anchor size="sm" href="#" onClick={(event) => event.preventDefault()}>
          {item.User.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm">{item.rollno}</Text>
      </td>
      <td>
        <Text size="sm">{item.examseatno}</Text>
      </td>
      <td>
        <Text size="sm">{item.prn}</Text>
      </td>
      <td>
        <Text size="sm">{item.curr_sem}</Text>
      </td>
      <td>
        <Text size="sm">{item.curryear}</Text>
      </td>
      <td>
        <Group>
          <ActionIcon>
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
        withColumnBorders
      >
        <thead>
          <tr>
            <th>Student</th>
            <th>Role</th>
            <th>Email</th>
            <th>Roll no.</th>
            <th>Exam seat no.</th>
            <th>PRN</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
