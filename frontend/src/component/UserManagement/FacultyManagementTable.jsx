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

import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function FacultyManagementTable({ data }) {
  console.log(data);
  const theme = useMantineTheme();
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
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
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
