import UserTabs from "./UserTabs";
import { Container } from "@mantine/core";

export default function Dashboard() {
  return (
    <>
      <Container>
        <UserTabs></UserTabs>
      </Container>
    </>
  );
}
