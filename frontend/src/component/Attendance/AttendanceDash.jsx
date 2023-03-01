import { Divider, Grid } from "@mantine/core";
import React from "react";
import AnimatedProgressBarCircle from "../Charts/AnimatedProgressBarCircle";
import AreaChart from "../Charts/AreaChart";

export default function AttendanceDash({ data }) {
  return (
    <>
      {data && (
        <>
          <h1>Departmentwise Distribution</h1>
          <Divider></Divider>
          <Grid mt={12}>
            <Grid.Col span={4}>
              <AnimatedProgressBarCircle
                data={data.deptAvg}
                title={"Average Department Attendance"}
              ></AnimatedProgressBarCircle>
            </Grid.Col>
            <Grid.Col span={8}>
              <AreaChart
                title={"Daily Average Attendance"}
                data={data.dailyAvg}
              ></AreaChart>
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
}
