import React from "react";
import { Container, SimpleGrid, BackgroundImage } from "@mantine/core";
import NavigationCard from "./NavigationCard";
import user from "../../assets/Images/new-entries-animate.svg";
import attendance from "../../assets/Images/confirmed-attendance-animate.svg";
import subjects from "../../assets/Images/thesis-animate.svg";
import StudentDash from "../Attendance/StudentDash";
import secureLocalStorage from "react-secure-storage";
import backgroundImage from "../../assets/Images/ttten1.svg";

export default function Dashboard() {
  const { role } = JSON.parse(secureLocalStorage.getItem("user"));
  return (
    <>
      {/* <Header/> */}
      <BackgroundImage src={backgroundImage}>
        <Container>
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            {role === "admin" && (
              <NavigationCard
                title={"User"}
                link={"/user-mgmt/1"}
                image={user}
              />
            )}
            {role !== "student" && (
              <NavigationCard
                title={"Attendance"}
                link={"/attend-mgmt/1"}
                image={attendance}
              />
            )}
            {role !== "student" && (
              <NavigationCard
                title={"Subjects"}
                link={"/subject-mgmt/1"}
                image={subjects}
              />
            )}
            {role !== "student" && (
              <NavigationCard
                title={"Marks"}
                link={"/marks-mgmt/1"}
                image={subjects}
              />
            )}
          </SimpleGrid>
          {role === "student" && <StudentDash></StudentDash>}
        </Container>
      </BackgroundImage>
    </>
  );
}
