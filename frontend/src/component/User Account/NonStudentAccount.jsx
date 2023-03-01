import {
  createStyles,
  Center,
  Avatar,
  BackgroundImage,
  Container,
  Text,
  Divider,
  Badge,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export default function NonStudentAccount({ data }) {
  const { classes, theme } = useStyles();
  console.log("inside component", data);

  return (
    <>
      <Center mt={200}>
        <Avatar
          size={"xl"}
          radius="xl"
          color={data.role === "admin" ? "red" : "yellow"}
        >
          {data.fullname.split(" ")[0][0] + data.fullname.split(" ")[1][0]}
        </Avatar>
      </Center>
      <Divider
        my={"sm"}
        label={
          <>
            <h1>{data.fullname}</h1>
          </>
        }
        labelPosition={"center"}
      ></Divider>
      <Container>
        <Center>
          <Text>{data.email}</Text>
          <Badge
            color={data.role === "admin" ? "red" : "yellow"}
            size="lg"
            variant="outline"
            mx={16}
          >
            {data.role}
          </Badge>
        </Center>
      </Container>
    </>
  );
}
