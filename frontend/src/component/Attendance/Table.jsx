import { useState } from "react";
import { showNotification } from "@mantine/notifications";

import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Button,
} from "@mantine/core";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function TableSelection({ data, subCode }) {
  let presenteeList = [];
  data.forEach((obj) => {
    let attendObj = {};
    attendObj.StudentUserId = obj.userId;
    attendObj.presentee = false;
    attendObj.SubjectSubCode = subCode;
    presenteeList.push(attendObj);
  });
  const { classes, cx } = useStyles();
  const [btnState, setBtnState] = useState(false);
  const [selection, setSelection] = useState([]);

  const toggleRow = (id) => {
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.userId)
    );

  const markAttendance = () => {
    if (presenteeList.length === 0) {
      setBtnState(false);
      return;
    }
    setBtnState(true);
    // showNotification({
    //   title: "Updating Attendance",
    //   message: "Commiting your Changes to Database...",
    //   disallowClose: true,
    //   loading: true,
    // });
    presenteeList.forEach((obj) => {
      if (selection.includes(obj.StudentUserId)) {
        obj.presentee = true;
      } else {
        obj.presentee = false;
      }
    });
    axios
      .post("http://localhost:5000/attend/multiple", presenteeList, {
        withCredentials: true,
      })
      .then((res) =>
        showNotification({
          title: "Success!",
          message: "Attendance updated.",
          color: "teal",
          disallowClose: false,
        })
      )
      .catch((err) =>
        showNotification({
          title: "Failed!",
          message: "Something went wrong.",
          color: "red",
        })
      );
    setBtnState(false);
  };

  const rows = data.map((item) => {
    const selected = selection.includes(item.userId);
    return (
      <tr key={item.userId} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.userId)}
            onChange={(e) => toggleRow(item.userId)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" weight={500}>
              {item.User.fullname}
            </Text>
          </Group>
        </td>
        <td>{item.rollno}</td>
        {/* <td>{currdate}</td> */}
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
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
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Button size="lg" mt={40} onClick={markAttendance} loading={btnState}>
        Mark Attendance
      </Button>
    </ScrollArea>
  );
}
