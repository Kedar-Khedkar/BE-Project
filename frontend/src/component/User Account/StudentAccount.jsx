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

export default function StudentAccount({ data }) {
  const { classes, theme } = useStyles();

  return (
    <>
      <Center mt={200}>
        <Avatar size={"xl"} radius="xl" color="cyan">
          {data.student.User.fullname.split(" ")[0][0] +
            data.student.User.fullname.split(" ")[1][0]}
        </Avatar>
      </Center>
      <Divider
        my={"sm"}
        label={
          <>
            <h1>{data.student.User.fullname}</h1>
          </>
        }
        labelPosition={"center"}
      ></Divider>
      <Container>
        <Center>
          <Text>{data.student.User.email}</Text>
          <Badge color="cyan" size="lg" variant="outline" mx={16}>
            Student
          </Badge>
        </Center>
      </Container>
    </>
  );
}
