import { Button, Grid, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

export default function DropzoneButton({
  accept,
  uploadLink,
  onResponse,
  onError,
  icon,
}) {
  const [uploaded, setUploaded] = useState(undefined);
  const [dropzoneText, setdropzoneText] = useState(
    "Click here to upload files or drag and drop"
  );
  const upload = () => {
    if (uploaded == undefined) {
      showNotification({
        title: "Select a file",
        message: "You must select a file in order to proceed",
        color: "yellow",
        icon: <IconAlertTriangleFilled />,
        disallowClose: false,
      });
    }
    const formData = new FormData();
    formData.append("file", uploaded[0]);
    axios
      .post(uploadLink, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => onResponse(res))
      .catch((err) => {
        onError(err);
      });
  };
  return (
    <>
      <Dropzone
        onDrop={(files) => {
          setdropzoneText(files[0].name);
          setUploaded(files);
        }}
        onReject={(files) => console.log("rejected files", files)}
        accept={accept}
        sx={(theme) => ({
          minHeight: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],

          "&[data-accept]": {
            color: theme.white,
            backgroundColor: theme.colors.blue[6],
          },

          "&[data-reject]": {
            color: theme.white,
            backgroundColor: theme.colors.red[6],
          },
        })}
      >
        <Grid>
          <Text align="center" size="xl">
            <Text align="center" size="xl">
              {icon}
            </Text>
            {dropzoneText}
            <Text size="sm" color="dimmed" inline mt={7}>
              Make sure the file is less than 5MB
            </Text>
          </Text>
        </Grid>
      </Dropzone>
      <Button onClick={upload} mt={20}>
        Upload
      </Button>
    </>
  );
}
