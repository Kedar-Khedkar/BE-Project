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
  useEffect(() => {
    let temp = [];
    data.forEach((student) => {
      student.forEach((subject) => {
        temp.push(subject);
      });
    });
    setTableData(temp);
  }, []);
  HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });

  const hotRef = useRef(null);
  let buttonClickCallback;
  useEffect(() => {
    const hot = hotRef.current.hotInstance;
    const exportPlugin = hot.getPlugin("exportFile");
    buttonClickCallback = () => {
      exportPlugin.downloadFile("csv", {
        bom: false,
        columnDelimiter: ",",
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: "csv",
        filename: `Mark_report_${new Date().toDateString()}`,
        mimeType: "text/csv",
        rowDelimiter: "\r\n",
        rowHeaders: true,
      });
    };
  });
  return (
    <Container mt={40} fluid>
      <Paper shadow={"md"} p="md">
        <Title order={3}>Extracted Data:</Title>
        <Text td={"underline"}>
          NOTE: The below table supports full spreadsheets functionality, you
          can customize this report and download according to your needs.
        </Text>
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
          data={tableData}
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
        />
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
