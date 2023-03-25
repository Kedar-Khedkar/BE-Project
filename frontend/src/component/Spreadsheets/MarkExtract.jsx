import React, { useRef, useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import { Button, Container, Paper, Text, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export default function MarkExtractExcel({ data }) {
  console.log(data);
  registerAllModules();
  const [tableData, setTableData] = useState([]);
  // useEffect(() => {
  //   let temp = [];
  //   data.forEach((student) => {
  //     student.forEach((subject) => {
  //       temp.push(subject);
  //     });
  //   });
  //   setTableData(temp);
  // }, []);
  HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });

  const hotRef = useRef(null);
  let buttonClickCallback;
  // useEffect(() => {
  //   const hot = hotRef.current.hotInstance;
  //   const exportPlugin = hot.getPlugin("exportFile");
  //   buttonClickCallback = () => {
  //     exportPlugin.downloadFile("csv", {
  //       bom: false,
  //       columnDelimiter: ",",
  //       columnHeaders: true,
  //       exportHiddenColumns: true,
  //       exportHiddenRows: true,
  //       fileExtension: "csv",
  //       filename: `Mark_report_${new Date().toDateString()}`,
  //       mimeType: "text/csv",
  //       rowDelimiter: "\r\n",
  //       rowHeaders: true,
  //     });
  //   };
  // });
  return (
    <Container mt={40} fluid>
      <Paper shadow={"md"} p="md">
        <Title order={3}>Extracted Data:</Title>
        <Text td={"underline"}>
          NOTE: The below table supports full spreadsheets functionality, you
          can customize this report and download according to your needs.
        </Text>
        {/* <HotTable
          contextMenu
          manualColumnMove
          manualColumnResize
          manualRowMove
          manualRowResize
          allowInsertColumn
          allowInsertRow
          allowRemoveColumn
          allowRemoveRow
          ref={hotRef}
          formulas={{
            engine: HyperFormula,
          }}
          licenseKey="non-commercial-and-evaluation"
          dataSchema={{
            SubjectSubCode: null,
            Insem: null,
            Endsem: null,
            TOTAL: null,
            TW: null,
            PR: null,
            OR: null,
            "Tot%": null,
            Crd: null,
            Grd: null,
            GP: null,
            CP: null,
            "P&R": null,
            ORD: null,
            seatno: null,
          }}
          // data={tableData}
          // data={[]}
          height="auto"
          width="100%"
          stretchH="all"
          dropdownMenu
          rowHeaders={true}
          columnSorting={{ indicator: true }}
          colHeaders={[
            "Subject Code",
            "Insem",
            "Endsem",
            "TOTAL",
            "TW",
            "PR",
            "OR",
            "Tot%",
            "Crd",
            "Grd",
            "GP",
            "CP",
            "P&R",
            "ORD",
            "seatno",
          ]}
          columns={[
            { data: "SubjectSubCode" },
            { data: "Insem" },
            { data: "Endsem" },
            { data: "TOTAL" },
            { data: "TW" },
            { data: "PR" },
            { data: "OR" },
            { data: "Tot%" },
            { data: "Crd" },
            { data: "Grd" },
            { data: "GP" },
            { data: "CP" },
            { data: "P&R" },
            { data: "ORD" },
            { data: "seatno" },
          ]}
         
        /> */}
         <HotTable
    data={[
      ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1','H1', 'I1', 'J1',"j2"],
      ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2','H1', 'I1', 'J1'],
      ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3','H1', 'I1', 'J1'],
      ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4','H1', 'I1', 'J1'],
      ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5','H1', 'I1', 'J1'],
    ]}
    colHeaders={true}
    rowHeaders={true}
    height="auto"
    nestedHeaders={[
        // khali continuation madhe add kar column names
      [ { label: 'E', colspan: 7}, { label: 'F', colspan: 7 }],
    //  ani headers cha count varcha colspan cha total pahije
      ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W','T', 'U', 'V', 'W']
    ]}
    licenseKey="non-commercial-and-evaluation"
      ></HotTable>
        <Button
          mt={12}
          fullWidth
          onClick={(...args) => buttonClickCallback(...args)}
          leftIcon={<IconDownload />}
        >
          Download as CSV
        </Button>
      </Paper>
    </Container>
  );
}
