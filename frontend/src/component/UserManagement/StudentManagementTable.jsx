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

export default function StudentManagementTable({ data }) {
  const theme = useMantineTheme();
  console.log(data);
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
    console.log(event.target);
    console.log("Ikde request jael edit chi");
  };
  const editUser = (obj) => {
    openModal({
      title: "Edit Student",
      centered: true,
      overlayOpacity: 0.15,
      overlayBlur: 3,
      children: (
        <>
          <form onSubmit={updateUser}>
            <TextInput
              value={obj.userId}
              display="none"
              name="userId"
            ></TextInput>
            <TextInput
              label="Name"
              withAsterisk
              name="fullname"
              defaultValue={obj.User.fullname}
            ></TextInput>
            <NativeSelect
              data={["admin", "faculty", "student"]}
              label="Role"
              defaultValue={"student"}
              name="role"
              withAsterisk
            />
            <TextInput
              label="Email"
              withAsterisk
              name="email"
              defaultValue={obj.User.email}
            ></TextInput>
            <TextInput
              label="Roll Number"
              withAsterisk
              name="rollno"
              defaultValue={obj.rollno}
            ></TextInput>
            <TextInput
              label="Exam seat Number"
              name="examseatno"
              withAsterisk
              defaultValue={obj.examseatno}
            ></TextInput>
            <TextInput
              label="Permanent Registration Number"
              withAsterisk
              name="prn"
              defaultValue={obj.prn}
            ></TextInput>
            <NativeSelect
              data={["3", "4", "5", "6", "7", "8"]}
              label="Semester"
              defaultValue={obj.curr_sem}
            />
            <NativeSelect
              data={["2", "3", "4"]}
              label="Semester"
              defaultValue={obj.curryear}
            />
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
          <ActionIcon
            onClick={() => {
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
