import UserTabs from "./UserTabs";
import { Container } from "@mantine/core";
import Subjects from "./Subjects";

export default function Dashboard() {
  return (
    <>
      <Container>
        {/* <UserTabs></UserTabs> */}
        <Subjects></Subjects>
      </Container>
    </>
  );
}
