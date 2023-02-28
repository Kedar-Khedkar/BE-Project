import React, { useEffect, useState } from "react";
import { Container, NativeSelect, Grid } from "@mantine/core";
import axios from "axios";
import { DateRangePicker } from "@mantine/dates";
import { IconCalendarEvent, IconBooks, IconSchool } from "@tabler/icons-react";

export default function AttendanceFilter({ children, onChange }) {
  const [selectData, setSelectData] = useState(["fetching data..."]);
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ]);
  const [filters, setFilters] = useState({
    from: dateRange[0],
    to: dateRange[1],
    year: "2",
    subject: "",
  });
  useEffect(() => {
    if (filters.subject !== "Select") {
      console.log({ filters: { ...filters } });
      axios
        .post(
          "http://localhost:5000/attend",
          { filters: { ...filters } },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          onChange(res.data);
        });
    }
  }, [filters]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/faculty", { withCredentials: true })
      .then((res) => {
        const objects = res.data.objects;
        let temp = ["Select a subject"];
        objects.forEach((object) => {
          temp.push(`${object.Subject.subCode} ${object.Subject.subName}`);
        });
        setSelectData(temp);
      });
  }, []);
  return (
    <Container>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={4}>
          <NativeSelect
            data={selectData}
            label="Select Subject"
            description="This will display all the students for the subject"
            radius="lg"
            size="md"
            withAsterisk
            onChange={(e) => {
              setFilters({ ...filters, subject: e.target.value.split(" ")[0] });
            }}
            icon={<IconBooks size={24} />}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <DateRangePicker
            label="Select Date range"
            description="Choose two dates to display attendance between those dates"
            radius="lg"
            size="md"
            withAsterisk
            value={dateRange}
            onChange={(e) => {
              setDateRange(e);
              setFilters({ ...filters, from: dateRange[0], to: dateRange[1] });
            }}
            icon={<IconCalendarEvent size={16} />}
            placeholder="select a range"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NativeSelect
            data={["2", "3", "4"]}
            label="Select Year"
            description="Choose which year students need to be displayed"
            defaultValue={"2"}
            onChange={(e) => {
              setFilters({ ...filters, year: e.target.value });
            }}
            radius="lg"
            size="md"
            icon={<IconSchool size={24} />}
            withAsterisk
          />
        </Grid.Col>
      </Grid>
      {children}
    </Container>
  );
}
