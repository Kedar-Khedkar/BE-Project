import { Center, Paper, SimpleGrid, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React from "react";
import AnimatedProgressBarCircle from "./AnimatedProgressBarCircle";
import { IconCalendarEvent } from "@tabler/icons-react";

export default function YearlyStats({ data, currFilters, setFilters }) {
  console.log(currFilters);
  return (
    <Paper shadow="md" radius="xl" p="md">
      <Center>
        <Title m={24} order={3}>
          Daily Count:
        </Title>
        <DatePicker
          //   label="Select Date"
          //   description="Choose the date you wish to see attendance for"
          radius="lg"
          size="md"
          withAsterisk
          value={new Date(currFilters.date)}
          onChange={(e) => {
            let date = new Date();
            date.setDate(e.getDate());
            setFilters({
              ...currFilters,
              date: date.toISOString().slice(0, 10),
            });
          }}
          icon={<IconCalendarEvent size={16} />}
          placeholder="dd-mm-yy"
        />
      </Center>
      <SimpleGrid cols={3}>
        <AnimatedProgressBarCircle
          title={"SE Attendance"}
          color="cyan"
          data={(Number(data[0].count) / Number(data[0].total)) * 100}
          dataDisplay={`${Number(data[0].count)} / ${Number(data[0].total)}`}
        />
        <AnimatedProgressBarCircle
          title={"TE Attendance"}
          color="yellow"
          data={(Number(data[1].count) / Number(data[1].total)) * 100}
          dataDisplay={`${Number(data[1].count)} / ${Number(data[1].total)}`}
        />
        <AnimatedProgressBarCircle
          title={"BE Attendance"}
          color="brown"
          data={(Number(data[2].count) / Number(data[2].total)) * 100}
          dataDisplay={`${Number(data[2].count)} / ${Number(data[2].total)}`}
        />
      </SimpleGrid>
    </Paper>
  );
}
