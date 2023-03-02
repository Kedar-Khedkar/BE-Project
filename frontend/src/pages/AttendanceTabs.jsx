import { Tabs, Container, Anchor, Center, Box, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import AttendanceFilter from "../component/Attendance/AttendanceFilter";
import Attendance from "../component/Attendance/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import AttendanceDash from "../component/Attendance/AttendanceDash";
import { useNavigate, useParams } from "react-router-dom";

export default function AttendanceTabs() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const [subjectList, setSubjectList] = useState();
  const [stats, setStats] = useState();
  const getSubjects = () => {
    axios
      .get("http://localhost:5000/faculty", { withCredentials: true })
      .then((res) => {
        const objects = res.data.objects;
        setSubjectList(objects);
      });
  };
  const getData = (data) => {
    console.log(data);
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/attend/stats", null, {
        withCredentials: true,
      })
      .then((res) => {
        setStats(res.data.objects);
      });
  }, []);

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
        onTabChange={(value) => navigate(`/attend-mgmt/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="1">Attendance Dashboard</Tabs.Tab>
          <Tabs.Tab value="2" onClick={getSubjects}>
            Mark Attendance
          </Tabs.Tab>
          <Tabs.Tab value="3">Edit Attendance</Tabs.Tab>
          <Tabs.Tab value="4">Report Generation</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1" pt="xs">
          Attendance Dashboard
          {/* <AttendanceFilter onChange={getData}></AttendanceFilter> */}
          <AttendanceDash data={stats}></AttendanceDash>
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="xs">
          <Attendance></Attendance>
        </Tabs.Panel>

        <Tabs.Panel value="3" pt="xs">
          Edit Previous Attendance
          <AttendanceFilter onChange={getData}></AttendanceFilter>
        </Tabs.Panel>

        <Tabs.Panel value="4" pt="xs">
          Generate Report
          <AttendanceFilter onChange={getData}></AttendanceFilter>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
