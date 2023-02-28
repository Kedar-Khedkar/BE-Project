import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
  } from '@mantine/core';
  import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
  
  

    export default function UnclaimSubjects({ data }) {
        console.log(data)
    
    const unclaimsubject = (subCode)=> {
        axios.delete(`http://localhost:5000/faculty/subject/${subCode}`, {withCredentials:true,})
        .then((res)=>{
            console.log(res)
        })
    }
    const theme = useMantineTheme();
    const rows = data.map((item) => (
      <tr key={item.Subject.subCode}>
        <td>
          <Group spacing="sm">
            {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
            <Text size="sm" weight={500}>
              {item.Subject.subCode}
            </Text>
          </Group>
        </td>
        <td>
          <Text size="sm" color="dimmed">
            {item.Subject.subName}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={()=>{unclaimsubject(item.Subject.subCode)}} color="red">
              <IconTrash  size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th></th>
              <th>Unclaim</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
  }