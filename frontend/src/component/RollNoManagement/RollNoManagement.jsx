import { Grid } from '@mantine/core';
import { Container, NativeSelect,ScrollArea, Button, Checkbox,Table, SimpleGrid,Paper, Text, Title } from '@mantine/core';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import React from "react";
import { IconDownload } from "@tabler/icons-react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from 'handsontable/registry';

export default function RollNoManagement (){
registerAllModules();
  HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({curryear: 2, curr_sem: 3});
    const hotRef = useRef(null);
    useEffect(()=>{
        //request
            axios.get("http://localhost:5000/student/search", {withCredentials: true, params: filter})
            .then((res) => {
                setData(res.data.objects);
                console.log(res.data.objects);
                
                //console.log(data)
            })
    },[filter])

    return(
        <>
        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={6}>
        <NativeSelect
      data={['2', '3', '4']}
      label="Select year"
      description="This is anonymous"
      radius="lg"
      withAsterisk
      value={filter.curryear}
      onChange={(e)=>{setFilter({...filter, curryear: e.target.value})}}
    />
        </Grid.Col>
        <Grid.Col span={6}>
        <NativeSelect
      data={['3','4','5','6','7','8']}
      label="Select semester"
      description="This is anonymous"
      radius="lg"
      withAsterisk
      value={filter.curr_sem}
      onChange={(e)=>{setFilter({...filter, curr_sem: e.target.value})}}
    />
        </Grid.Col>
      </Grid>

      <Container mt={40}>
      <Paper shadow={"md"} p="md">
        <Title order={3}>Manage Roll Numbers</Title>
        
        <HotTable
          contextMenu
          manualColumnMove
          manualColumnResize
          manualRowMove
          manualRowResize
          allowInsertColumn
          allowInsertRow
          allowRemoveColumn
          allowRemoveRow
        //   ref={hotRef}
          formulas={{
            engine: HyperFormula,
          }}
          licenseKey="non-commercial-and-evaluation"
          dataSchema={{
            userId: null,
              rollno: null,
              User: {
                fullname: null,
              },
          }}
          data={data}
          height="auto"
          width="100%"
          stretchH="all"
          dropdownMenu
          rowHeaders={true}
          multiplecolumnSorting={true}
          colHeaders={[
            "Student Name",
            "Roll number",
          ]}
          columns={[
            { data: "User.fullname" },
            { data: "rollno" },
          ]}
        />
        <Button
          mt={12}
          fullWidth
        //   onClick={(...args) => buttonClickCallback(...args)}
          leftIcon={<IconDownload />}
        >
          Download as CSV
        </Button>
      </Paper>
    </Container>

    </>
    )

}