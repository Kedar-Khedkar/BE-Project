import { Grid } from '@mantine/core';
import { Container, NativeSelect,ScrollArea, Button, Checkbox,Table, SimpleGrid } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from "react";
import { MantineProvider } from "@mantine/core";
import RichTextEditor from '../RichTextEditor/RichTextEditor';

export default function Notifications () {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({curryear: 2, curr_sem: 3})
    const [selection, setSelection] = useState([]);
    useEffect(()=>{
        //request
            axios.get("http://localhost:5000/student/search", {withCredentials: true, params: filter})
            .then((res) => {
                setData(res.data.objects);
                console.log(res.data.objects);
                console.log(data)
            })

        //setData
        //usestate second arg [data]
    },[filter])

    const toggleRow = (obj) => {
        setSelection((current) =>
          current.includes(obj)
            ? current.filter((item) => item !== obj)
            : [...current, obj]
        );
      };
    const toggleAll = () =>
        setSelection((current) =>
          current.length === data.length ? [] : data.map((obj) => obj)
        );
  return (
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
    

      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
              onChange={toggleAll}
              checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>Name</th>
            <th>Roll No.</th>
          </tr>
        </thead>
        <tbody>
            {data.map((obj)=>(
                <tr key={obj.User.id}>
                <td>
                    <Checkbox
                    checked={selection.includes(obj)}
                    onChange={(e) => toggleRow(obj)}
                    transitionDuration={0}/>
                </td>
                <td>{obj.User.fullname}</td>
                <td>{obj.rollno}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div>
      <h3>Enter the message</h3>
      <RichTextEditor />
    </div>

      <Button
      size="lg"
      mt={40}
      onClick={()=>{console.log(selection)}}
      >
        Send Message
      </Button>
      
    </>
  );
}