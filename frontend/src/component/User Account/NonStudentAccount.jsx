import {
    createStyles,
    Center,
    Avatar,
    BackgroundImage,
    Container,
    Text,
    Divider,
    Badge
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
  
  export default function NonStudentAccount({data}) {
    const { classes, theme } = useStyles();
    console.log("inside component",data)
  
    return (
      <>
        <Center mt={200}>
          <Avatar
            variant="outline"
            radius="xl"
            size="xl"
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
          />
        </Center>
        <Divider my={"sm"} label={<><h1>{data.fullname}</h1></>} labelPosition={"center"}></Divider>
        <Container>
          <Center>
          <Text>{data.email}</Text>
          <Badge color="yellow" size="lg" variant="outline" mx={16}>{data.role}</Badge>
          </Center>
        </Container>
      </>
    );
  }
  