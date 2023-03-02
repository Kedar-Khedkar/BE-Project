import React, { useEffect, useState } from "react";
import StudentAccount from "../component/User Account/StudentAccount";
import axios from "axios";
import { Anchor, Center, Box } from "@mantine/core";
import NonStudentAccount from "../component/User Account/NonStudentAccount";
import { IconArrowLeft } from "@tabler/icons-react";
import secureLocalStorage from "react-secure-storage";

export default function MyAccount() {
  const [userData, setUserData] = useState(undefined);
  const user = JSON.parse(secureLocalStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/my-account`, { withCredentials: true })
      .then((res) => {
        setUserData(res.data.objects);
      });
  }, []);

  return (
    <>
      <Anchor href="/dashboard" color={"gray"} mt={24}>
        <Center inline>
          {<IconArrowLeft size={24} stroke={1.5} />}
          <Box ml={5}>Back to Dashboard</Box>
        </Center>
      </Anchor>
      {userData && user.role === "student" && (
        <StudentAccount data={userData}></StudentAccount>
      )}
      {userData && user.role !== "student" && (
        <NonStudentAccount data={userData}></NonStudentAccount>
      )}
    </>
  );
}
