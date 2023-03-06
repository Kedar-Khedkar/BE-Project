import { Tabs, Container, Anchor, Box, Center } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MarksTabs() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  return (
    <Container>
      <Anchor href="/dashboard" color={"gray"} mt={24}>
        <Center inline>
          {<IconArrowLeft size={24} stroke={1.5} />}
          <Box ml={5}>Back to Dashboard</Box>
        </Center>
      </Anchor>
      <Tabs
        variant="pills"
        radius="lg"
        defaultValue="1"
        value={tabValue}
        onTabChange={(value) => navigate(`/marks-mgmt/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="1">Unit Tests</Tabs.Tab>
          <Tabs.Tab value="2">In-sem</Tabs.Tab>
          <Tabs.Tab value="3">Generate Report</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1" pt="xs"></Tabs.Panel>

        <Tabs.Panel value="2" pt="xs"></Tabs.Panel>

        <Tabs.Panel value="3" pt="xs"></Tabs.Panel>
      </Tabs>
    </Container>
  );
}
