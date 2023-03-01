import { Tabs } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import AttendanceFilter from "../component/Attendance/AttendanceFilter";
import Attendance from "../component/Attendance/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import AttendanceDash from "../component/Attendance/AttendanceDash";
export default function AttendanceTabs() {
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
    <Tabs variant="outline" defaultValue="Attendance Dashboard">
      <Tabs.List>
        <Tabs.Tab value="Attendance Dashboard">Attendance Dashboard</Tabs.Tab>
        <Tabs.Tab value="Mark Attendance" onClick={getSubjects}>
          Mark Attendance
        </Tabs.Tab>
        <Tabs.Tab value="Edit Attendance">Edit Attendance</Tabs.Tab>
        <Tabs.Tab value="Report Generation">Report Generation</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Attendance Dashboard" pt="xs">
        Attendance Dashboard
        {/* <AttendanceFilter onChange={getData}></AttendanceFilter> */}
        <AttendanceDash data={stats}></AttendanceDash>
      </Tabs.Panel>

      <Tabs.Panel value="Mark Attendance" pt="xs">
        <Attendance></Attendance>
      </Tabs.Panel>

      <Tabs.Panel value="Edit Attendance" pt="xs">
        Edit Previous Attendance
        <AttendanceFilter onChange={getData}></AttendanceFilter>
      </Tabs.Panel>

      <Tabs.Panel value="Report Generation" pt="xs">
        Generate Report
        <AttendanceFilter onChange={getData}></AttendanceFilter>
      </Tabs.Panel>
    </Tabs>
  );
}
