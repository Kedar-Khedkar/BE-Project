import React from "react";
import { Paper, Center, Text } from "@mantine/core";
import { VictoryPie } from "victory";

export default function AnimatedProgressBarCircle({ data, title }) {
  const value = Number(data[0].deptAvg) * 100;
  return (
    <>
      <Paper shadow="md" radius="xl" p="md" withBorder>
        <Text size={"lg"}>
          {`${title}`}
          <strong> {value}%</strong>
        </Text>
        <VictoryPie
          data={[
            { x: " ", y: value },
            { x: " ", y: 100 - value },
          ]}
          colorScale={["tomato", "white"]}
          innerRadius={100}
        />
        <Center>
          <Text size={"xl"} weight={"bold"}>
            {title}
          </Text>
        </Center>
      </Paper>
    </>
  );
}
