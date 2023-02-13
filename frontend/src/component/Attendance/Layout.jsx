import React, { useEffect, useState } from "react";
import { Container, NativeSelect } from "@mantine/core";
import axios from "axios";

import Table from "./Table";

export default function Attendance() {
  const [studentList, setStudentList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectData, setSelectData] = useState(["fetching data..."]);
  const [subjectSubCode, setSubjectSubCode] = useState(undefined);

  /* Fetching data from the server and setting the state of the component. */
  useEffect(() => {
    axios
      .get("http://localhost:5000/faculty", { withCredentials: true })
      .then((res) => {
        const objects = res.data.objects;
        setSubjectList(objects);
      });
  }, []);
  useEffect(() => {}, [selectData]); // to re-render table on dropdown value change
  useEffect(() => {
    let temp = ["Select a subject"];
    subjectList.forEach((obj) => {
      temp.push(`${obj.Subject.subCode} ${obj.Subject.subName}`);
    });
    setSelectData(temp);
  }, [subjectList]);

  /**
   * It fetches students from the database based on the subject code.
   */
  const fetchStudents = (e) => {
    let sem = -1;
    let SubCode = e.target.value.split(" ")[0];
    subjectList.forEach((obj) => {
      let subcode = obj.Subject.subCode;
      if (subcode === SubCode) {
        sem = obj.Subject.sem;
      }
    });
    if (sem !== -1) {
      axios
        .get(
          `http://localhost:5000/student/search?curryear=2&curr_sem=${sem}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res.data.objects);
          setStudentList(res.data.objects);
          setSubjectSubCode(SubCode);
        });
    }
  };
  return (
    /* A fragment. It is used to group a list of children without adding extra nodes to the DOM. */
    <>
      <Container>
        <h1>Mark Attendance</h1>
        <NativeSelect
          data={selectData}
          label="Select Subject"
          description="This will display all the students for the subject"
          radius="lg"
          size="md"
          withAsterisk
          onChange={fetchStudents}
        />
        {<Table data={studentList} subCode={subjectSubCode} />}
      </Container>
    </>
  );
}
