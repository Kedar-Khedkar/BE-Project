import { Tabs } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import AddUser from "../component/Add User/AddUser";
import FacultyManagementTable from "../component/UserManagement/FacultyManagementTable";
import RestoreUsersTable from "../component/UserManagement/RestoreUsersTable";
import StudentManagementTable from "../component/UserManagement/StudentManagementTable";

export default function UserTabs() {
  const [facultyData, setFacultyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [trashedUsers, setTrashedUsers] = useState([]);
  const getFaculty = () => {
    axios
      .get("http://localhost:5000/faculty/all", { withCredentials: true })
      .then((res) => {
        setFacultyData(res.data.objects);
      });
  };

  const getStudents = () => {
    axios
      .get("http://localhost:5000/student/search", { withCredentials: true })
      .then((res) => {
        setStudentData(res.data.objects);
      });
  };

  const getTrash = () => {
    axios
      .get("http://localhost:5000/users/trash", { withCredentials: true })
      .then((res) => {
        setTrashedUsers(res.data.objects);
      });
  };

  return (
    <Tabs variant="outline" defaultValue="Create Users">
      <Tabs.List>
        <Tabs.Tab value="Create Users">Create Users</Tabs.Tab>
        <Tabs.Tab value="Manage Faculty" onClick={getFaculty}>
          Manage Faculty
        </Tabs.Tab>
        <Tabs.Tab value="Manage Students" onClick={getStudents}>
          Manage Students
        </Tabs.Tab>
        <Tabs.Tab value="Restore Deleted" onClick={getTrash}>
          Restore Deleted accounts
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Create Users" pt="xs">
        Create new users
        <AddUser></AddUser>
      </Tabs.Panel>

      <Tabs.Panel value="Manage Faculty" pt="xs">
        Manage all faculty accounts
        <FacultyManagementTable data={facultyData}></FacultyManagementTable>
      </Tabs.Panel>

      <Tabs.Panel value="Manage Students" pt="xs">
        Manage all student accounts
        <StudentManagementTable data={studentData}></StudentManagementTable>
      </Tabs.Panel>
      <Tabs.Panel value="Restore Deleted" pt="xs">
        Restore or Permanently Delete, previously deleted, accounts.
        <RestoreUsersTable data={trashedUsers}></RestoreUsersTable>
      </Tabs.Panel>
    </Tabs>
  );
}
