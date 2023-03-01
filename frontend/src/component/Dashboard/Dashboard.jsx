import React from "react";
import { Container } from "@mantine/core";
import Header from "./Header";
import NavigationCard from "./NavigationCard";
export default function Dashboard() {
  return (
    <>
      {/* <Header/> */}
      <Container>
        <NavigationCard />
      </Container>
    </>
  );
}
