import { Divider, SimpleGrid } from "@mantine/core";
import React from "react";
import AnimatedProgressBarCircle from "../Charts/AnimatedProgressBarCircle";
import AreaChart from "../Charts/AreaChart";

export default function AttendanceDash({ data }) {
  return (
    <>
      {data && (
        <>
          <h1>Departmentwise Distribution</h1>
          <Divider mb={6}/>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]} >
            <div>
              <AnimatedProgressBarCircle
                data={data.deptAvg[0].deptAvg}
                title={"Average Department Attendance"}
              />
            </div>

            <div>
              <AreaChart
                title={"Daily Average Attendance"}
                data={data.dailyAvg}
              />
            </div>
          </SimpleGrid>
        </>
      )}
    </>
  );
}
