import React from "react";
import { Container, SimpleGrid } from "@mantine/core";
import NavigationCard from "./NavigationCard";
import user from "../../assets/Images/new-entries-animate.svg";
import StudentDash from "../Attendance/StudentDash";
import secureLocalStorage from "react-secure-storage";

export default function Dashboard() {
  const { role } = JSON.parse(secureLocalStorage.getItem("user"));
  return (
    <>
      {/* <Header/> */}
      <Container mt={100}>
        <SimpleGrid cols={3}>
          {role === "admin" && (
            <NavigationCard title={"User"} link={"/user-mgmt/1"} image={user} />
          )}
          {role !== "student" && (
            <NavigationCard
              title={"Attendance"}
              link={"/attend-mgmt/1"}
              image={user}
            />
          )}
          {role !== "student" && (
            <NavigationCard
              title={"Subjects"}
              link={"/subject-mgmt/1"}
              image={user}
            />
          )}
        </SimpleGrid>
        {role === "student" && <StudentDash></StudentDash>}
      </Container>
    </>
  );
}
