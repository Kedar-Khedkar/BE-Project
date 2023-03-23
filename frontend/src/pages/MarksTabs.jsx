import { Tabs, Container, Anchor, Box, Center } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageWithRectangles } from "../component/ImageCrop/ImageCropper";
import SubjectFilter from "../component/Unit Tests/SubjectFilter";
import UnitTest from "../component/Unit Tests/UnitTest";
import ExtractMarks from "../component/Extract Marks/ExtractMarks";
export default function MarksTabs() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const [unitTestData, setUnitTestData] = useState([]);
  const [filters, setFilters] = useState({ subcode: null, sem: null });
  const getUTData = (subcode, sem) => {
    setFilters({ subcode: subcode, sem: sem });
    axios
      .get(
        `http://localhost:5000/unitTest?SubjectSubCode=${subcode}&sem=${sem}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUnitTestData(res.data.objects);
      });
  };
  return (
    <Container fluid>
      <Anchor href="/dashboard" mt={24}>
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
          <Tabs.Tab value="3">Extract Marks</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1" pt="xs">
          <SubjectFilter onChange={getUTData} />
          <UnitTest data={unitTestData} refresh={getUTData} filters={filters} />
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="xs">
          <ImageWithRectangles />
        </Tabs.Panel>

        <Tabs.Panel value="3" pt="xs">
          <ExtractMarks />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
