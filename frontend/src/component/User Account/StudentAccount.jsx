import {
  createStyles,
  Center,
  Avatar,
  BackgroundImage,
  Container,
  Text,
  Divider,
  Badge,Card,TextInput,ActionIcon,Button,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { IconPencil } from "@tabler/icons-react";

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
  const [isNotEdit, setIsNotEdit] = useState(true);
  const { classes, theme } = useStyles();
  const initialValues = {prn: data.student.prn, rollno: data.student.rollno,
  examseatno: data.student.examseatno, curr_sem: data.student.curr_sem, curryear: data.student.curryear}

  const initial = {fullname: data.student.User.fullname, email: data.student.User.email}
  const formPersonal = useForm({initial})

  const form = useForm({initialValues})
  console.log(initialValues)
  const updateStudent = (event,id)=> {
    event.preventDefault();
    axios.put(`http://localhost:5000/student/${id}`, {student:form.values}, {withCredentials:true})
    .then((res)=>{console.log(res)}).catch((res)=>{})
    console.log(form.values); 

  }
  const updatePersonalData = (event,id) =>{
    event.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, {user:formPersonal.values}, {withCredentials:true})
    .then((res)=>{console.log(res)}).catch((res)=>{})
    console.log(formPersonal.values)
  }


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
        <Card>
          <ActionIcon ml={900} onClick={()=>{setIsNotEdit(!isNotEdit)}}>
            <IconPencil></IconPencil>
          </ActionIcon>
           <form onSubmit={(e)=>{updateStudent(e, data.student.userId)}}>
            {/* <TextInput disabled={isNotEdit} label="Fullname" 
            defaultValue={data.student.User.fullname} withAsterisk 
            {...form.getInputProps("fullname")} description="Your name in firstname<space>lastname format"/> */}
            {/* <TextInput disabled={isNotEdit}label="Email" 
            defaultValue={data.student.User.email} withAsterisk 
            {...form.getInputProps("email")} description="email associated with your account"/> */}
            <TextInput type={Number} disabled={isNotEdit} label="PRN" defaultValue={data.student.prn} withAsterisk {...form.getInputProps("prn")} />
            <TextInput type={Number} disabled={isNotEdit} label="Roll No" defaultValue={data.student.rollno} withAsterisk {...form.getInputProps("rollno")} />
            <TextInput type={Number} disabled={isNotEdit} label="Exam Seat No" defaultValue={data.student.examseatno} withAsterisk {...form.getInputProps("examseatno")} />
            <TextInput type={Number} disabled={true} label="Current Semester" defaultValue={data.student.curr_sem} />
            <TextInput type={Number} disabled={true} label="Current Year" defaultValue={data.student.curryear} />
            <Button mt={12} type="submit" disabled={isNotEdit}>Edit</Button>
          </form>
        </Card>
        <Card>
        <form onSubmit={(e)=>{updatePersonalData(e, data.student.userId)}}>
            <TextInput disabled={isNotEdit} label="Fullname" defaultValue={data.student.User.fullname} withAsterisk {...formPersonal.getInputProps("fullname")} description="Your name in firstname<space>lastname format"/>
            <TextInput disabled={isNotEdit}label="Email" defaultValue={data.student.User.email} withAsterisk {...formPersonal.getInputProps("email")} description="email associated with your account"/>
            <Button mt={12} type="submit" disabled={isNotEdit}>Edit</Button>
          </form>
        </Card>
      </Container>
    </>
  );
}
