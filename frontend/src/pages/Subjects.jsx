import { Tabs } from '@mantine/core';
//import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';
import CreateSubject from "../component/Create Subject/CreateSubject";
export default function Subjects() {
  return (
    <Tabs variant="outline" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="Create Subject">Create Subject</Tabs.Tab>
        <Tabs.Tab value="Edit Subject" >Edit Subject</Tabs.Tab>
        <Tabs.Tab value="Claim Subject" >Claim Subject</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Create Subject" pt="xs">
        <CreateSubject></CreateSubject>
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}