import React from "react";
import { useState, useEffect } from "react";
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
  Modal,
  TextInput,
  Button,
} from "@mantine/core";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import EditSubjectForm from "./EditSubjectForm";

function Editsubject() {
  const [result, setResult] = useState([]);
  const [opened, setOpened] = useState(undefined);
  const [tempState, setTempState] = useState({});

  // const form=useForm({
  //     initialValues: {
  //       subName: tempState['name'],
  //       subCode: tempState['code'],
  //       pract:tempState['pract'],
  //       oral: tempState['oral'],
  //       sem: tempState['sem']
  //     },
  //   });

  console.log(tempState);
  useEffect(() => {
    axios
      .get("http://localhost:5000/subjects/all", { withCredentials: true })
      .then((res) => {
        setResult(res.data.objects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/subjects/${id}`, {
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
  const rows = result.map((item, id) => (
    <tr key={id}>
      <td>
        <Text size="sm" weight={500}>
          {item.subName}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.subCode}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.pract}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.oral}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.sem}
        </Text>
      </td>

      <td>
        <ActionIcon
          onClick={() => {
            setOpened({ ...item });
            console.log(opened);
          }}
        >
          <IconPencil size={16} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          onClick={() => {
            deleteUser(item.subCode);
          }}
          color="red"
        >
          <IconTrash size={16} stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  ));

  // const theme = useMantineTheme();
  // const rows = data.map((item) => (
  //     <tr key={item.name}>
  //       <td>
  //         <Group spacing="sm">
  //           <Avatar size={30} src={item.avatar} radius={30} />
  //           <Text size="sm" weight={500}>
  //             {item.name}
  //           </Text>
  //         </Group>
  //       </td>

  //       <td>
  //         <Badge
  //           color={jobColors[item.job.toLowerCase()]}
  //           variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
  //         >
  //           {item.job}
  //         </Badge>
  //       </td>
  //       <td>
  //         <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
  //           {item.email}
  //         </Anchor>
  //       </td>
  //       <td>
  //         <Text size="sm" color="dimmed">
  //           {item.phone}
  //         </Text>
  //       </td>
  //       <td>
  //         <Group spacing={0} position="right">
  //
  //         </Group>
  //       </td>
  //     </tr>
  //   ));

  return (
    <>
      <ScrollArea>
        {opened && (
          <EditSubjectForm
            opened={opened != undefined}
            onClose={setOpened}
            data={opened}
          />
        )}
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Practical</th>
              <th>Oral</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      {/* <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setTempState({ name: "", code: "", pract: "", oral: "", sem: "" });
        }}
        title="Edit Subject"
      >
        <form className="editSubjectForm">
          <div style={{ maxWidth: 320, margin: "auto" }}>
            <TextInput
              defaultValue={tempState["name"]}
              label="Name"
              placeholder="Subject Name"
              {...form.getInputProps("subName")}
            />
            <TextInput
              defaultValue={tempState["code"]}
              mt="md"
              label="Subject Code"
              placeholder="Subject Code"
              {...form.getInputProps("subCode")}
            />
            <TextInput
              defaultValue={tempState["pract"]}
              mt="md"
              label="Practical"
              placeholder="Practical"
              {...form.getInputProps("pract")}
            />
            <TextInput
              defaultValue={tempState["oral"]}
              mt="md"
              label="Oral"
              placeholder="Oral"
              {...form.getInputProps("oral")}
            />
            <TextInput
              defaultValue={tempState["sem"]}
              mt="md"
              label="Sem"
              placeholder="Sem"
              {...form.getInputProps("sem")}
            />

            <Group position="center" mt="xl">
              {/* <Button
          variant="outline"
        //   onClick={() =>
        //     form.setValues({
        //       name: randomId(),
        //       email: `${randomId()}@test.com`,
        //     })
          }
        >
          Set random values
        </Button> */}
      {/* <Button>Update</Button>
            </Group>
          </div>
        </form>
      </Modal> */}{" "}
      }*/
    </>
  );
}

export default Editsubject;
