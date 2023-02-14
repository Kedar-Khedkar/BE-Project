// import React, { useState, useEffect } from "react";
// import pattern from "../../assets/Images/oooscillate.svg";
// import "./AddUser.scss";
// import axios from "axios";
// import {
//   Card,
//   Container,
//   Row,
//   Col,
//   Nav,
//   Form,
//   Button,
//   Modal,
// } from "react-bootstrap";
// import Dropzone from "../Drop zone/Dropzone";
// import ErrorModal from './Modal'

// function FacultyForm() {
//   const [validated, setValidated] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [invalidity, setInvalidity] = useState(false);
//   const initialValues = { email: "", fullname: "" };
//   const [formValues, setFormValues] = useState(initialValues);
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   useEffect(() => {
//     console.log(formErrors);
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(formValues);
//     }
//   }, [formErrors]);

//   const validateForm = (values) => {
//     const errors = {};
//     const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     const num_regex = /\d/;
//     // if (!values.email) {
//     //   errors.email = "Email is required!";
//     //   setInvalidity(true);
//     // } else if (!email_regex.test(values.email)) {
//     //   errors.email = "This is not a valid email format!";
//     //   setInvalidity(true);
//     // }

//     if (!values.fullname) {
//       errors.fullname = "Fullname is required!";
//       setInvalidity(true);
//     } else if (num_regex.test(values.fullname)) {
//       errors.fullname = "This is not a valid name format!";
//       setInvalidity(true);
//     }

//     return errors;
//   };

//   let errorsMsg={} ;
//   const handleFacultySubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(formValues));
//     setIsSubmit(true);
//     if (invalidity) {
//       setValidated(true);
//     }
//     // console.log(formValues);

//     // send values to backend
//     const user = { user: { ...formValues, role: "faculty" } };
//     axios
//       .post("http://localhost:5000/users/facultyRegister", user)
//       .then(function (response) {
//         console.log(response.data);
//       })

//       // .catch(function (error) {
//       //   setShow(true);
//       //   console.log(error.response.data);
//       //   errorsMsg=error.response.data;
//       // });
//   };

//   return (
//     <>

//       <ErrorModal show={show} onHide={handleClose} error={errorsMsg} />
//       <Form noValidate onSubmit={handleFacultySubmit} validated={validated}>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 onChange={handleChange}
//                 name="fullname"
//                 placeholder="Enter Name"
//                 isInvalid={invalidity}
//                 required
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formErrors.fullname}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md>
//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 onChange={handleChange}
//                 placeholder="name@mmcoe.edu.in"
//                 isInvalid={invalidity}
//                 required
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formErrors.email}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formFacultyId">
//               <Form.Label>Faculty ID</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Faculty Id"
//                 // required
//               />
//             </Form.Group>
//           </Col>

//           <Col md>
//             <Form.Group className="mb-3" controlId="formPhoneNumber">
//               <Form.Label> Phone Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter phone number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Button
//             variant="primary"
//             type="addUser"
//             className="align-self-center"
//           >
//             Add User
//           </Button>
//         </Row>
//       </Form>
//     </>
//   );
// }

// function StudentForm() {
//   const initialValues = { email: "", fullname: "" };
//   const [formValues, setFormValues] = useState(initialValues);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };
//   const handleStudentSubmit = (e) => {
//     e.preventDefault();
//     const user = { user: { ...formValues, role: "student" } };
//     axios
//       .post("http://localhost:5000/users/studentRegister", user)
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.log(error.response.data);
//       });
//   };
//   return (
//     <>
//       <Form noValidate onSubmit={handleStudentSubmit}>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fullname"
//                 onChange={handleChange}
//                 placeholder="Enter Name"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="name@mmcoe.edu.in"
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formPhoneNumber">
//               <Form.Label> Phone Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter phone number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formBatch">
//               <Form.Label>Batch</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Batch"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formPRNNumber">
//               <Form.Label> PRN Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter prn number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formRollNumber">
//               <Form.Label>Roll number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter roll number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formPhoneNumber">
//               <Form.Label>Parents Phone Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter parents phone number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Button variant="primary" type="submit" className="align-self-center">
//             Add User
//           </Button>
//         </Row>
//       </Form>
//     </>
//   );
// }

// function Forms() {
//   const [category, setCategory] = useState("Faculty");
//   return (
//     <>
//       <div className="switchUser mt-3">
//         <Nav justify variant="pills" defaultActiveKey="Faculty">
//           <Nav.Item>
//             <Nav.Link
//               className="text-white"
//               eventKey="Faculty"
//               onClick={(event) => setCategory("Faculty")}
//             >
//               Faculty
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link
//               className="text-white"
//               eventKey="Student"
//               onClick={(event) => setCategory("Student")}
//             >
//               Student
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </div>
//       <br />
//       <div className="addUserForm">
//         {category === "Faculty" ? <FacultyForm /> : <StudentForm />}
//       </div>
//     </>
//   );
// }

// export default function AddUser() {
//   const [checked, setChecked] = useState(false);

//   const handleChange = () => {
//     setChecked(!checked);
//   };
//   return (
//     <>
//       <div
//         style={{ backgroundImage: `url(${pattern})`, backgroundSize: "cover" }}
//       >
//         <Container
//           fluid
//           className={"jumbotron d-flex align-items-center min-vh-100"}
//         >
//           <Card style={{ width: "50rem" }} bg={"dark"} className={" mx-auto "}>
//             <Card.Body>
//               <Container>
//                 <Row>
//                   <Col md="auto">
//                     <h2 className={"text-center"}>Add User</h2>
//                     <span>
//                       Create account by uploading .csv files or create them
//                       manually.
//                     </span>

//                     <span>Passwords are generated automatically.</span>

//                     <div className={"text-center mt-1"}>
//                       <label className="switch">
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={handleChange}
//                         />
//                         <div>
//                           <span>Upload files</span>
//                         </div>
//                       </label>
//                     </div>
//                     <div>{checked ? <Dropzone /> : <Forms />}</div>
//                   </Col>
//                 </Row>
//               </Container>
//             </Card.Body>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// }

import {
  Text,
  Paper,
  Space,
  Container,
  SimpleGrid,
  TextInput,
  NumberInput,
  Button,
  Switch,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import { IconUserPlus, IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
// import useradd from "../../assets/Images/person-plus-fill.svg";
function FacultyForm() {
  const form = useForm({
    initialValues: {
      user: {
        email: "",
        fullname: "",
        // phone: 0,
        // facultyid: "",
        role: "faculty",
      },
    },

    // functions will be used to validate values at corresponding key
    validate: {
      user: {
        // phone: (value) =>
        //   String(value).length === 10 ? null : "Invalid phone number",
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        fullname: (value) =>
          typeof value === "string" ? null : "Invalid name",
      },
    },
  });
  const handleSubmitFaculty = (event, values) => {
    // form.setFieldValue('role',"faculty")
    console.log(form.values);
    axios
      .post("http://localhost:5000/users/facultyRegister", form.values)
      .then(function (response) {
        if (response.data.status === "success") {
          showNotification({
            title: "Success",
            message: "User added successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 2000,
            radius: "xl",
          });
        } else {
          showNotification({
            title: "Fail",
            message: response.data.err,
            icon: <IconX />,
            color: "red",
            autoClose: 2000,
            radius: "xl",
          });
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmitFaculty)}>
        <Container>
          <Space h="xs" />
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            <div>
              <TextInput
                placeholder="Your name"
                label="Name"
                withAsterisk
                {...form.getInputProps("user.fullname")}
              />
            </div>
            <div>
              <TextInput
                placeholder="dev@mmcoe.edu.in"
                label="Email"
                withAsterisk
                {...form.getInputProps("user.email")}
              />
            </div>
            {/* <div>
              <TextInput
                placeholder="Faculty Id"
                label="Faculty Id"
                {...form.getInputProps("user.facultyid")}
                // withAsterisk
              />
            </div> */}

            {/* <div>
              <NumberInput
                placeholder="00000000000"
                label="Phone"
                hideControls
                {...form.getInputProps("user.phone")}
              />
            </div> */}
          </SimpleGrid>
          <Space h="md" />
          <Container size={500} px={0}>
            <Button
              fullWidth
              // variant="outline"
              type="submit"
              leftIcon={<IconUserPlus />}
            >
              Add User
            </Button>
          </Container>
        </Container>
      </form>
    </>
  );
}
function StudentForm() {
  const form = useForm({
    initialValues: {
      user: {
        email: "",
        fullname: "",
        phone: 0,
        parentsphone: 0,
        rollnumber: 0,
        batch: "",
        prnnumber: "",
        role: "student",
      },
    },

    // functions will be used to validate values at corresponding key
    validate: {
      user: {
        phone: (value) =>
          String(value).length === 10 ? null : "Invalid phone number",
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        fullname: (value) =>
          typeof value === "string" ? null : "Invalid name",
      },
    },
  });
  const handleSubmitStudent = (event, values) => {
    console.log(form.values);
    axios
      .post("http://localhost:5000/users/studentRegister", form.values)
      .then(function (response) {
        if (response.data.status === "success") {
          showNotification({
            title: "Success",
            message: "User added successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 2000,
            radius: "xl",
          });
        } else {
          showNotification({
            title: "Fail",
            message: response.data.err,
            icon: <IconX />,
            color: "red",
            autoClose: 2000,
            radius: "xl",
          });
        }
      })
      .catch(function (response) {
        console.log(response.data);
      });
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmitStudent)}>
        <Container>
          <Space h="xs" />
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            <div>
              <TextInput
                placeholder="Your name"
                label="Name"
                withAsterisk
                {...form.getInputProps("user.fullname")}
              />
            </div>
            <div>
              <TextInput
                placeholder="dev@mmcoe.edu.in"
                label="Email"
                {...form.getInputProps("user.email")}
                // withAsterisk
              />
            </div>
            <div>
              <NumberInput
                placeholder="0000000000"
                label="Phone"
                hideControls
                {...form.getInputProps("user.phone")}
                // withAsterisk
              />
            </div>
            <div>
              <NumberInput
                placeholder="0000000000"
                label="Parents Phone number"
                hideControls
                {...form.getInputProps("user.parentsphone")}
                // withAsterisk
              />
            </div>
            <div>
              <TextInput
                placeholder="batch"
                label="Batch"
                {...form.getInputProps("user.batch")}
                //  withAsterisk
              />
            </div>
            <div>
              <NumberInput
                placeholder=""
                label="Roll number"
                hideControls
                {...form.getInputProps("user.rollnumber")}
                // withAsterisk
              />
            </div>
            <div>
              <TextInput
                placeholder="prn "
                label="PRN number"
                {...form.getInputProps("user.prnnumber")}
                //  withAsterisk
              />
            </div>
          </SimpleGrid>
          <Space h="md" />
          <Container size={500} px={0}>
            <Button
              fullWidth
              variant="outline"
              type="submit"
              leftIcon={<IconUserPlus />}
            >
              Add User
            </Button>
          </Container>
        </Container>
      </form>
    </>
  );
}

function Forms() {
  const [category, setCategory] = useState("faculty");
  return (
    <>
      <Stack align="center">
        <Space h="xs" />
        <SegmentedControl
          color="blue"
          value={category}
          size="md"
          radius={20}
          onChange={setCategory}
          data={[
            { value: "faculty", label: "Faculty" },
            { value: "ftudent", label: "Student" },
          ]}
        />
      </Stack>
      <div className="addUserForm">
        {category === "faculty" ? <FacultyForm /> : <StudentForm />}
      </div>
    </>
  );
}
export default function AddUser() {
  const [checked, setChecked] = useState(false);
  return (
    <Container>
      <Paper shadow="md" p="md" withBorder>
        <Text align="center" fz="xl" fw={700}>
          Add User
        </Text>
        <Text align="center">
          Use it to create cards, dropdowns, modals and other components that
          require background with shadow
        </Text>
        <Stack align="center">
          <Space h="xs" />
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            size="md"
            label="Upload files"
          />
        </Stack>
        <Forms />
        {/* <StudentForm /> */}
      </Paper>
    </Container>
  );
}
