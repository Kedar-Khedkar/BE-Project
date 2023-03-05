import React from "react";
import { Paper, Center, Text } from "@mantine/core";
import { VictoryPie } from "victory";

export default function AnimatedProgressBarCircle({
  data,
  title,
  color,
  dataDisplay,
}) {
  console.log(data);
  if (data == null) {
    data = 0;
  }
  // const value = Number(data[0].deptAvg) * 100;
  return (
    <>
      <Paper shadow="md" radius="xl" p="md">
        <Text size={"lg"}>
          {`${title}`}
          <strong> {dataDisplay}</strong>
        </Text>
        <VictoryPie
          data={[
            { x: data, y: Number(data) },
            { x: 100 - data, y: 100 - Number(data) },
          ]}
          colorScale={color ? [color, "gray"] : ["tomato", "gray"]}
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
