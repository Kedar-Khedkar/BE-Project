import { Divider, Grid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AnimatedProgressBarCircle from "../Charts/AnimatedProgressBarCircle";
import AreaChart from "../Charts/AreaChart";
import axios from "axios";
import BarChart from "../Charts/BarChart";

export default function StudentDash() {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    axios
      .get("http://localhost:5000/attend/stud-stats", { withCredentials: true })
      .then((res) => {
        setData(res.data.objects);
      });
  }, []);
  return (
    <>
      <h1>Welcome back! here are your Statistics!</h1>
      <Divider></Divider>
      {data && (
        <>
          <Grid mt={12}>
            <Grid.Col span={4}>
              <AnimatedProgressBarCircle
                data={data.totalAvg[0].avg}
                title={"Your Total Attendance"}
              ></AnimatedProgressBarCircle>
            </Grid.Col>
            <Grid.Col span={8}>
              <BarChart
                title={"Your Subjectwise total Attendance"}
                data={data.subwise}
                x={"SubjectSubCode"}
                y={"avg"}
              ></BarChart>
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
}
