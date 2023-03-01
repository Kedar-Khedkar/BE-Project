import React from "react";
import { Container, SimpleGrid } from "@mantine/core";
import NavigationCard from "./NavigationCard";
import user from "../../assets/Images/new-entries-animate.svg";
export default function Dashboard() {
  const { role } = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {/* <Header/> */}
      <Container mt={100}>
        <SimpleGrid cols={3}>
          {role === "admin" && (
            <NavigationCard title={"User"} link={"/user-mgmt"} image={user} />
          )}
          {role !== "student" && (
            <NavigationCard
              title={"Attendance"}
              link={"/attend-mgmt"}
              image={user}
            />
          )}
          {role !== "student" && (
            <NavigationCard
              title={"Subjects"}
              link={"/subject-mgmt"}
              image={user}
            />
          )}
        </SimpleGrid>
      </Container>
    </>
  );
}
