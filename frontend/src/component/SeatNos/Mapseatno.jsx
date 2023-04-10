import { IconPdf, IconFileText, IconCheck, IconX } from "@tabler/icons-react";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Badge, Table } from "@mantine/core";
import DropzoneButton from "../Drop zone/Dropzone";
import { PDF_MIME_TYPE } from "@mantine/dropzone";

export default function Mapseatno() {
  const handleResponse = (res) => {
    console.log(res);
    const { data } = res;
    if (data.status === "success") {
      showNotification({
        title: "Success!",
        message: "seat numbers mapped to students",
        color: "teal",
        icon: <IconCheck />,
        autoClose: 2000,
        radius: "xl",
      });
    } else {
      const rows = data.err.map((user) => (
        <tr key={Math.random()}>
          <td>{user.examseatno}</td>
          <td>{user.fullname}</td>
          <td>{user.prn}</td>
          <td>
            <Badge color="red">{user.errmsg}</Badge>
          </td>
        </tr>
      ));
      showNotification({
        title: "Failed!",
        message: "we encountered few errors",
        color: "red",
        icon: <IconX />,
        disallowClose: false,
      });
      openModal({
        title: "The following errors were encountered",
        children: (
          <Table striped highlightOnHover withColumnBorders>
            <thead>
              <tr>
                <th>Seat Number</th>
                <th>Full Name</th>
                <th>PRN</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ),
        size: "auto",
      });
    }
  };
  return (
    <DropzoneButton
      uploadLink={"http://localhost:5000/student/mapSeatnos"}
      onResponse={handleResponse}
      icon={<IconPdf color="#1a7fdb" size={36} />}
      accept={PDF_MIME_TYPE}
    />
  );
}
