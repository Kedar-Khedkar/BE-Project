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
  Paper,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

export default function UnclaimSubjects({ data }) {
  console.log(data);

  const unclaimsubject = (subCode) => {
    axios
      .delete(`http://localhost:5000/faculty/subject/${subCode}`, {
        withCredentials: true,
      })
      .then((res) => {
        showNotification({
          title: "Success!",
          message: "Subject unclaimed successfully",
          color: "teal",
          disallowClose: false,
        });
        console.log(res);
      })
      .catch(function (err) {
        showNotification({
          title: "Failed!",
          message: "Something went wrong.",
          color: "red",
        });
        console.log(err);
      });
  };
  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item.Subject.subCode}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text size="sm" weight={500}>
            {item.Subject.subCode}
          </Text>
        </Group>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item.Subject.subName}
        </Text>
      </td>
      <td>
          <ActionIcon
            onClick={() => {
              unclaimsubject(item.Subject.subCode);
            }}
            color="red"
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
       
      </td>
    </tr>
  ));

  return (
    <Paper shadow="md" p="md">
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Unclaim</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
