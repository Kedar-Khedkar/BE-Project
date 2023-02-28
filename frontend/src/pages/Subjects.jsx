import { Tabs } from '@mantine/core';
//import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';
import CreateSubject from "../component/Create Subject/CreateSubject";
import ClaimSubjects from '../component/Claim Subjects/ClaimSubjects';
import axios from 'axios';
import { useState } from 'react';

import Editsubject from '../component/Edit Subject/Editsubject';
export default function Subjects() {

  const [subjectData, setSubjectData] = useState([]);

  const getSubjects = ()=>{
    axios.get("http://localhost:5000/subjects/all", {withCredentials:true})
    .then((res)=>{
      console.log(res.data.objects);
      const objects = res.data.objects;
        let temp = [];
        objects.forEach((object) => {
          temp.push({value: `${object.subCode}`, label: `${object.subCode} ${object.subName}`});
        });
      setSubjectData(temp);
    })
  }

  return (
    <Tabs variant="outline" defaultValue="Create Subject">
      <Tabs.List>
        <Tabs.Tab value="Create Subject">Create Subject</Tabs.Tab>
        <Tabs.Tab value="Edit Subject" >Edit Subject</Tabs.Tab>
        <Tabs.Tab value="Claim Subject" onClick={getSubjects} >Claim Subject</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Create Subject" pt="xs">
        <CreateSubject></CreateSubject>
      </Tabs.Panel>

      <Tabs.Panel value="Edit Subject" pt="xs">
        <Editsubject></Editsubject>
      </Tabs.Panel>

      <Tabs.Panel value="Claim Subject"  pt="xs">
        <ClaimSubjects data={subjectData}></ClaimSubjects>
      </Tabs.Panel>
    </Tabs>
  );
}