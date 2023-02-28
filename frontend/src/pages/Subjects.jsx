import { Tabs } from '@mantine/core';
//import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';
import CreateSubject from "../component/Create Subject/CreateSubject";
import Editsubject from '../component/Edit Subject/Editsubject';
export default function Subjects() {
  return (
    <Tabs variant="outline" defaultValue="Create Subject">
      <Tabs.List>
        <Tabs.Tab value="Create Subject">Create Subject</Tabs.Tab>
        <Tabs.Tab value="Edit Subject" >Edit Subject</Tabs.Tab>
        <Tabs.Tab value="Claim Subject" >Claim Subject</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Create Subject" pt="xs">
        <CreateSubject></CreateSubject>
      </Tabs.Panel>

      <Tabs.Panel value="Edit Subject" pt="xs">
        <Editsubject></Editsubject>
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}