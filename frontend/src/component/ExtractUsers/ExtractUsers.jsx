import { Container, Title, Anchor, Table, Badge } from "@mantine/core";
import DropzoneButton from "../Drop zone/Dropzone";
import { MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import { IconFileSpreadsheet, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { openModal } from "@mantine/modals";

export default function ExtractUsers() {
  const ths = (
    <tr>
      <th>Email</th>
      <th>Full name</th>
      <th>Role</th>
      <th>Error encountered</th>
    </tr>
  );

  const handleResponse = (res) => {
    console.log(res);
    const { data } = res;
    if (data.status === "success") {
      showNotification({
        title: "Success!",
        message: data.objects.msg,
        color: "teal",
        icon: <IconCheck />,
        disallowClose: false,
      });
    } else {
      const rows = data.objects.map((user) => (
        <tr key={Math.random()}>
          <td>{user.email}</td>
          <td>{user.fullname}</td>
          <td>{user.role}</td>
          <td>
            <Badge color="red">{user.errmsg}</Badge>
          </td>
        </tr>
      ));
      showNotification({
        title: "Failed!",
        message: data.err,
        color: "red",
        icon: <IconX />,
        disallowClose: false,
      });
      openModal({
        title: "The following errors were encountered",
        children: (
          <Table striped highlightOnHover>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        ),
        size: "auto",
      });
    }
  };
  return (
    <>
      <Container>
        <Title order={1}>Create Users by uploading Excel sheet</Title>
        <IconFileSpreadsheet size={24} />
        <Anchor target={"_self"} href="http://localhost:5000/users/download">
          Click here to download template file.
        </Anchor>
        <DropzoneButton
          uploadLink={"http://localhost:5000/users/upload"}
          accept={MS_EXCEL_MIME_TYPE}
          onResponse={handleResponse}
          onError={console.log}
          icon={<IconFileSpreadsheet size={50} stroke={1.5} />}
        />
      </Container>
    </>
  );
}
