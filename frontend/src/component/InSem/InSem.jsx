import React, { useEffect, useState } from "react";
import { Table, NumberInput, Text, Paper, Container, ScrollArea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";

export default function InSem(){

    return(
        <Container>
            <ScrollArea>
        <Paper shadow={"md"} p={"md"}>
      <Text td={"underline"} m={8}>
        NOTE: All Entered Data is saved to Database automatically, no need to
        submit
      </Text>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Student</th>
            <th>Roll no.</th>
            <th>Insem Marks</th>
          </tr>
        </thead>
        {/* <tbody>{rows}</tbody> */}
      </Table>
    </Paper>
    </ScrollArea>
    </Container>
    );
}