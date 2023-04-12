import { Grid } from "@mantine/core";
import {
  Container,
  NativeSelect,
  ScrollArea,
  Button,
  Checkbox,
  Table,
  SimpleGrid,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import React from "react";
import { IconDownload } from "@tabler/icons-react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import { showNotification } from "@mantine/notifications";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";

export default function RollNoManagement() {
  registerAllModules();
  HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ curryear: 2, curr_sem: 3 });
  const hotTableRef = useRef(null);

  useEffect(() => {
    //request
    axios
      .get("http://localhost:5000/student/search", {
        withCredentials: true,
        params: filter,
      })
      .then((res) => {
        setData(res.data.objects);
        console.log(res.data.objects);

        //console.log(data)
      });
  }, [filter]);
 
  const handleDownloadCSV = () => {
    hotTableRef.current.hotInstance.getPlugin('exportFile').downloadFile('csv', {
      bom: true,
      columnHeaders: true,
      columnDelimiter: ',',
      rowDelimiter: '\r\n',
      filename: 'RollNumbers',
      mimeType: 'text/csv',
      data: hotTableRef.current.hotInstance.getData(),
    });
  };

  const handleAfterColumnSort = (currentSortConfig, destinationSortConfigs) => {
    // Get the Handsontable instance from the ref
    const hot = hotTableRef.current.hotInstance;

    // Get the sorted rows
    const sortedRows = hot.getData();
    // Loop through the sorted rows and update the roll number column
    sortedRows.forEach((rowData, rowIndex) => {
      //   hot.setDataAtCell(rowIndex, 1, rowIndex + 1); // Update the roll number column
      const rollno = rowIndex + 1; // Calculate the roll number for this row
      hot.setDataAtCell(rowIndex, 1, rollno); // Update the roll number column
      //console.log(`Updated row ${rowIndex + 1}: Roll number = ${rollno}, Name = ${rowData[0]}`);
    });
  };
 
  let result = [];
  let err = [];
  const handleSubmit = () => {
    result = [];
    err = [];
    const hot = hotTableRef.current.hotInstance;
    const sortedRows = hot.getData();
    sortedRows.forEach((ele) => {
      const id = ele[2];
      axios
        .put(
          `http://localhost:5000/student/${id}`,
          { student: { rollno: ele[1] } },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          result.push(res.data.status);
          //console.log(result);
        })
        .catch((error) => {
          err.push(error.data);
          console.log(error);
        });
      //catch: {fullname:"ele[0]", userId: "ele[2]", "rollno": ele[1], "errmsg":res.err}
    });
    //console.log(result)
    showNotification({
      title: "Success",
      message: "Roll numbers updated successfully",
      icon: <IconCheck />,
      color: "teal",
      autoClose: 2000,
      radius: "xl",
    });
    //console.log("result:", result);
    //log for response: results chi len inserted out of sorted chi lent
  };
  return (
    <>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={6}>
          <NativeSelect
            data={["2", "3", "4"]}
            label="Select year"
            description="This is anonymous"
            radius="lg"
            withAsterisk
            value={filter.curryear}
            onChange={(e) => {
              setFilter({ ...filter, curryear: e.target.value });
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NativeSelect
            data={["3", "4", "5", "6", "7", "8"]}
            label="Select semester"
            description="This is anonymous"
            radius="lg"
            withAsterisk
            value={filter.curr_sem}
            onChange={(e) => {
              setFilter({ ...filter, curr_sem: e.target.value });
            }}
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
            ref={hotTableRef}
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
            columnSorting={true}
            afterColumnSort={handleAfterColumnSort}
            colHeaders={["Student Name", "Roll number", "UserId"]}
            columns={[
              { data: "User.fullname", readOnly: true },
              { data: "rollno", readOnly: true },
              { data: "userId", readOnly: true},
            ]}
          />
          <Button mt={12} fullWidth onClick={handleSubmit}>
            Update roll numbers
          </Button>
          <Button
          mt={12}
          fullWidth
          onClick={handleDownloadCSV}
          leftIcon={<IconDownload />}
        >
          Download as CSV
        </Button>
        </Paper>
      </Container>
    </>
  );
}





