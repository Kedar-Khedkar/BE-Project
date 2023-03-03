import React from "react";
import { Paper, Center, Text } from "@mantine/core";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory";

export default function BarChart({ data, title, x, y, y_tickValues }) {
  console.log(data);
  // const value = Number(data[0].deptAvg) * 100;
  return (
    <>
      <Paper shadow="md" radius="xl" p="md" >
        <Text size={"lg"}>{`${title}`}</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryBar
            data={data}
            x={x}
            y={y}
            colorScale={["green", "tomato", "cyan", "blue"]}
          />
          {/* <VictoryAxis dependentAxis tickValues={y_tickValues} /> */}
        </VictoryChart>
        <Center>
          <Text size={"xl"} weight={"bold"}>
            {title}
          </Text>
        </Center>
      </Paper>
    </>
  );
}
