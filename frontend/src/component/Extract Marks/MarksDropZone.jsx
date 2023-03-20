import { Container } from "@mantine/core";
import React from "react";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import DropzoneButton from "../Drop zone/Dropzone";
import { IconPdf, IconCheck } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
export default function ExtractMarks() {
  const handleResponse = (res) => {
    console.log(res)
    // const { data } = res;

    // if (data.status === "success") {
    //   showNotification({
    //     title: "Success!",
    //     message: data.objects.msg,
    //     color: "teal",
    //     icon: <IconCheck />,
    //     autoClose: 2000,
    //     radius: "xl",
    //   });
    // }
  };
  return (
    <>
      <Container>
        <DropzoneButton
          uploadLink={"http://localhost:5000/marks/upload"}
          onResponse={handleResponse}
          icon={<IconPdf color="#1a7fdb" size={36} />}
          accept={PDF_MIME_TYPE}
        />
      </Container>
    </>
  );
}
