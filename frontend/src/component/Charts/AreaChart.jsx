import React from "react";
import { Paper, Center, Text } from "@mantine/core";
import { VictoryLine, VictoryChart } from "victory";

export default function AreaChart({ data, title }) {
  console.log(data);
  return (
    <>
      <Paper shadow="md" radius="xl" p="md" withBorder>
        <Text size={"lg"}>{title}</Text>
        <VictoryChart>
          <VictoryLine
            interpolation="natural"
            data={data}
            x={"date"}
            y={"avg"}
          />
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
